import { ReactComponent as IconFolderClosed } from './img/folder-closed.svg'
import { ReactComponent as IconFolderOpened } from './img/folder-opened.svg'
import { ReactComponent as IconArrowClosed } from './img/arrow-closed.svg'
import { ReactComponent as IconArrowOpened } from './img/arrow-opened.svg'
import { ReactComponent as IconCameraEnabled } from './img/camera-enabled.svg'
import { ReactComponent as IconCameraDisabled } from './img/camera-disabled.svg'
import { ReactComponent as IconEventsGroup } from './img/events-group.svg'
import { ReactComponent as IconRealtime } from './img/realtime.svg'


//
// Get icon by type
//

export const getIcon = (type) => {
  switch (type) {
    case 'folder': return <IconFolderClosed />
    case 'folder_opened': return <IconFolderOpened />
    case 'arrow_closed': return <IconArrowClosed />
    case 'arrow_opened': return <IconArrowOpened />
    case 'camera': return <IconCameraDisabled />
    case 'camera_enabled': return <IconCameraEnabled />
    case 'events_group': return <IconEventsGroup />
    case 'realtime': return <IconRealtime />
    default: return null
  }
}


//
// Convert raw JSON response to unique IDs used for UI
//

const generatedArray = []

const generateUniqueId = () => {
  const random = Math.ceil(Math.random() * (99999 - 10000) + 10000)

  if (!generatedArray.includes(random)) {
    generatedArray.push(random)
    return random
  } else {
    return generateUniqueId()
  }
}


//
// Transform raw JSON from backend to add uniqueIds needed for frontend
//

export const transformRawJSONToAddUniqueIds = (tree) => {
  if (!tree) return []

  return tree.map((node) => {
    const newNode = {
      ...node,
      uniqueId: generateUniqueId(),
    }

    if (node.contains) {
      newNode.contains = transformRawJSONToAddUniqueIds(node.contains)
    }

    return newNode
  })
}


//
// Rename node in tree by it's uniquId
//

export const renameNodeInTreeByUniqueId = (tree, uniqueId, newName) => (
  tree.map((node) => {
    if (node.uniqueId === uniqueId) {
      return {
        ...node,
        name: newName,
      }
    } else if (node.contains) {
      return {
        ...node,
        contains: renameNodeInTreeByUniqueId(node.contains, uniqueId, newName)
      }
    } else {
      return node
    }
  })
)


//
// Find node in tree by given uniqueId and remove from original tree
// Returns array with [ removedNode, and originalTreeWithoutRemovedNode ]
//

const findNodeByUniqueIdAndRemoveFromTree = (tree, targetUniqueId) => {
  let removedNode
  let treeWithoutRemovedNode

  const walkOnTree = (tree, targetUniqueId) => {
    // Firstly, filter current level of tree to remove target and save it for return
    const filteredTree = tree.filter((node) => {
      if (node.uniqueId === targetUniqueId) {
        removedNode = node
        return false
      }

      return true
    })

    // Map our countains props for every object in given tree and return it
    return filteredTree.map((node) => {
      const { contains, ...nodeWithoutContains } = node

      const returnObj = { ...nodeWithoutContains, contains: [] }

      if (contains) {
        returnObj.contains = walkOnTree(contains, targetUniqueId)
      }

      return returnObj
    })
  }

  treeWithoutRemovedNode = walkOnTree(tree, targetUniqueId)

  return [ removedNode, treeWithoutRemovedNode ]
}


//
// Insert given node into node with given uniqueId
//

const insertGivenNodeIntoNodeWithGivenUniqueId = (tree, nodeToInsert, whereToInsertUniqueId) => {
  const walkOnTree = (tree, nodeToInsert, whereToInsertUniqueId) => {
    return tree.map((node) => {
      const { contains, ...nodeWithoutContains } = node

      const newNodeState = { ...nodeWithoutContains }

      if (node.type === 'folder' || node.type === 'camera') {
        newNodeState.contains = []
      }

      if (node.uniqueId === whereToInsertUniqueId) {
        newNodeState.contains = [
          ...contains,
          nodeToInsert,
        ]
      } else if (contains && contains.length) {
        newNodeState.contains = walkOnTree(contains, nodeToInsert, whereToInsertUniqueId)
      }

      return newNodeState
    })
  }

  return walkOnTree(tree, nodeToInsert, whereToInsertUniqueId)
}


//
// Move node with given uniqueId to other node
//

export const moveNode = (tree, whatToMoveUniqueId, whereToMoveUniqueId) => {
  const [
    nodeWithGivenUniqueId,
    treeWithoutNodeWithGivenUniqueId
  ] = findNodeByUniqueIdAndRemoveFromTree(tree, whatToMoveUniqueId)

  return insertGivenNodeIntoNodeWithGivenUniqueId(
    treeWithoutNodeWithGivenUniqueId,
    nodeWithGivenUniqueId,
    whereToMoveUniqueId
  )
}


//
// Sort tree alphabetically, folders at the top
//

export const sortTree = (tree) => {
  const walkOnTree = (tree) => {
    return tree.map((node) => {
      const { contains, ...nodeWithoutContains } = node

      const newNodeState = { ...nodeWithoutContains }

      if (node.type === 'folder' || node.type === 'camera') {
        newNodeState.contains = []
      }

      if (contains && contains.length) {
        const sortFunc = (a, b) => {
          if (a.name < b.name) return -1
          if (a.name > b.name) return 1
          return 0
        }

        const onlyFolders = contains.filter((node) => node.type === 'folder').sort(sortFunc)
        const restNodes = contains.filter((node) => node.type !== 'folder').sort(sortFunc)

        newNodeState.contains = walkOnTree([
          ...onlyFolders,
          ...restNodes,
        ])
      }

      return newNodeState
    })
  }

  return walkOnTree(tree)
}
