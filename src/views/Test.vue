<template>

  <sl-vue-tree-next v-model="updatedThemes" ref="tree" style="height: 100vh; width: 60vw; margin: 20px auto; padding: 10px" @drop="nodeDropped" @select="nodeSelected" >
    <template #title="{ node }">
                            <span class="item-icon">
                              <i v-if="!node.isLeaf" class="fa fa-folder"></i>
                              <i v-else class="fa  fa-question "></i>
                            </span>

      {{ node.title }}
    </template>

    <template #toggle="{ node }" >
                            <span v-if="!node.isLeaf && node.children.length">
                                <i v-if="node.isExpanded" class="fa fa-chevron-down"></i>
                                <i v-if="!node.isExpanded" class="fa fa-chevron-right"></i>
                            </span>
      <span v-else></span>
    </template>

    <template #sidebar="{ node }">
                            <span class="visible-icon" style="display: flex; justify-content: space-between; align-items: center; float: right" >
                               <i  class="fa fa-edit" style="margin-right: 5px"></i>
                               <i  class="fa fa-trash" v-if="!node.isLeaf&& node.children.length===0 "></i>
                            </span>

    </template>
    <template #draginfo="draginfo"> {{selectedNodesTitle}} </template>
  </sl-vue-tree-next>


</template>

<script setup>
// https://github.com/kcsujeet/sl-vue-tree-next/tree/master
// sl-vue-tree-next
const questions = ref([
  {q_id:1,type_id:1,subject_id:1, title:'Cto takoe OOP?'  },
  {q_id:1,type_id:1,subject_id:2, title:'Cto isp dly sozdanya saytov?'  },
  {q_id:1,type_id:1,subject_id:7, title:'Cto takoe CSS'  },
  {q_id:1,type_id:1,subject_id:5, title:'kak uznat ip mashini ' },
  {q_id:1,type_id:1,subject_id:5, title:'lkhjhgsdgfgfgfghkjttrht'  }

])

const subjects = ref([
  {id:1, title:'Programming'  },
  {id:2, title:'FrontEnd', parent_id:1  },
  {id:8, title:'BackEnd', parent_id:1  },
  {id:3, title:'Administration' },
  {id:4, title:'Linux', parent_id:3},
  {id:5, title:'Windows' , parent_id:3  },
  {id:6, title:'HTML', parent_id:2   },
  {id:7, title:'CSS',parent_id:2  },
  {id:9, title:'Go', parent_id:8   },
  {id:10, title:'C++',parent_id:8  },
])
    const data = [
    { title: 'Item1', isLeaf: true },
        { title: 'Item2', isLeaf: true, data: { visible: false } },
        { title: 'Folder1' },
        {
          title: 'Folder2',
          isExpanded: true,
          children: [
            { title: 'Item3', isLeaf: true },
            { title: 'Item4', isLeaf: true },
            {
              title: 'Folder3',
              children: [{ title: 'Item5', isLeaf: true }],
            },
          ],
        },
        { title: 'Folder5', isExpanded: false },
        { title: 'Item6', isLeaf: true },
        { title: 'Item7', isLeaf: true, data: { visible: false } },
        {
          title: 'Folder6',
          children: [
            {
              title: 'Folder7',
              children: [
                { title: 'Item8', isLeaf: true },
                { title: 'Item9', isLeaf: true },
              ],
            },
          ],
        },
    ]
const testToTree= ( ) => {
  const map = new Map(subjects.value.map(item => [item.id, item]));
  for (let item of map.values()) {
    item.isExpanded= false
    item.children=[]
    item.isDraggable=false
    if (!map.has(item.parent_id)){
      continue
    }
    const parent = map.get(item.parent_id)
    parent.children = [...parent.children||[], item]

  }
  return [...map.values()].filter((item)=> !item.parent_id)
}
const dataNew = testToTree()
function addQuestionsToThemes(questions, themes) {
  function recurse(questions, themes) {
    for (const theme of themes) {
      const relatedQuestions = questions.filter(q => {
        if (q.subject_id === theme.id) {
          q.isLeaf = true
          return true
        }
      });
      theme.children = theme.children.concat(relatedQuestions); // Добавляем вопросы
      if (theme.children && Array.isArray(theme.children)) {
        const subthemes = theme.children.filter(item => item.children !== undefined);
        if(subthemes.length > 0){
          recurse(questions, subthemes);
        }
      }
    }
  }
  recurse(questions, themes);
  return themes;
}

const updatedThemes = addQuestionsToThemes(questions.value, dataNew);


import { SlVueTreeNext } from 'sl-vue-tree-next'
import { ref, shallowRef} from "vue";
const tree = shallowRef(null)

const lastEvent = ref('')
const toggleVisibility= (event, node)=> {
  console.log(tree.value)
  const slVueTree = tree.value
  event.stopPropagation()
  const visible = !node.data || node.data.visible !== false
  slVueTree.updateNode({ path: node.path, patch: { data: { visible: !visible } }})
  lastEvent.value = `Node ${node.title} is ${visible ? 'visible' : 'invisible'} now`
}




const selectedNodesTitle = ref('')
const nodeSelected = (nodes, event)=> {
  const slVueTree = tree.value
  selectedNodesTitle.value = nodes.map((node) => node.title).join(', ')
  // selectedNodesTitle.value = `Select nodes: ${selectedNodesTitle.value}`
  console.log(selectedNodesTitle)
}

const nodeToggled=(node, event)=> {
  node.lastEvent = `Node ${node.title} is ${node.isExpanded ? 'expanded' : 'collapsed'}`
}

const nodeDropped = (nodes, position, event) =>{
  const lastEvent = `Nodes: ${nodes.map((node) => node.title).join(', ')} are dropped ${position.placement} ${position.node.title}`
  console.log(position)
}
const contextMenuIsVisible = ref(false)
const showContextMenu= (node, event)=> {
  event.preventDefault()
  contextMenuIsVisible.value = true
  const $contextMenu = tree.value.contextmenu
  $contextMenu.style.left = event.clientX + 'px'
  $contextMenu.style.top = event.clientY + 'px'
}

const removeNode=() =>{
  contextMenuIsVisible.value = false
  const slVueTree = tree.value
  const paths = slVueTree.getSelected().map((node) => node.path)
  slVueTree.remove(paths)
}


</script>

<style>
.sl-vue-tree-next {
  position: relative;
  cursor: default;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.sl-vue-tree-next.sl-vue-tree-next-root {
  border: 1px solid rgb(9, 22, 29);
  background-color: rgb(31, 31, 31);
  color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.sl-vue-tree-next-root > .sl-vue-tree-next-nodes-list {
  overflow: hidden;
  position: relative;
  padding-bottom: 4px;
}

.sl-vue-tree-next-selected > .sl-vue-tree-next-node-item {
  background-color: #13242d;
  color: white;
}

.sl-vue-tree-next-node-item:hover,
.sl-vue-tree-next-node-item.sl-vue-tree-next-cursor-hover {
  color: white;
}

.sl-vue-tree-next-node-item {
  position: relative;
  display: flex;
  flex-direction: row;

  padding-left: 10px;
  padding-right: 10px;
  line-height: 28px;
  border: 1px solid transparent;
}

.sl-vue-tree-next-node-item.sl-vue-tree-next-cursor-inside {
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.sl-vue-tree-next-gap {
  width: 25px;
  min-height: 1px;
}

.sl-vue-tree-next-toggle {
  display: inline-block;
  text-align: left;
  width: 20px;
}

.sl-vue-tree-next-sidebar {
  margin-left: auto;
}

.sl-vue-tree-next-cursor {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.5);
  height: 1px;
  width: 100%;
}

.sl-vue-tree-next-drag-info {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
  margin-left: 20px;
  padding: 5px 10px;
}



.row {
  display: flex;
  margin-bottom: 10px;
}

.contextmenu {
  position: absolute;
  background-color: white;
  color: black;
  border-radius: 2px;
  cursor: pointer;
}

.contextmenu > div {
  padding: 10px;
}

.contextmenu > div:hover {
  background-color: rgba(100, 100, 255, 0.5);
}

.last-event {
  color: white;
  background-color: rgba(100, 100, 255, 0.5);
  padding: 10px;
  border-radius: 2px;
}

.tree-container {
  flex-grow: 1;
}

.sl-vue-tree-next.sl-vue-tree-next-root {
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  height: 300px;
}



.item-icon {
  display: inline-block;
  text-align: left;
  width: 20px;
}
</style>