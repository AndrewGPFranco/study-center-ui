<template>
  <div class="h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
    <div
        class="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm z-10">
      <div class="flex items-center gap-3">
        <router-link :to="{name: 'home-view'}">
          <UTooltip text="Voltar" :popper="{ placement: 'right' }">
            <UIcon name="i-lucide-arrow-left" class="w-6 h-6 text-gray-500"/>
          </UTooltip>
        </router-link>
        <div class="p-2 bg-primary-500/10 rounded-lg">
          <UIcon name="i-heroicons-share" class="w-6 h-6 text-primary-500"/>
        </div>
        <div>
          <h1 class="text-lg font-bold leading-tight">Visualização de Roteiros</h1>
          <p class="text-xs text-gray-500 dark:text-gray-400">Explore roteiro de diversas tecnologias</p>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full max-w-md">
        <UInput v-model="technology" icon="i-heroicons-magnifying-glass" placeholder="Ex: java, python..."
                class="flex-1" @keyup.enter="fetchGraphData">
          <template #trailing>
            <UButton v-show="technology !== ''" color="gray" variant="link" class="cursor-pointer"
                     icon="i-heroicons-x-mark" :padded="false" @click="technology = ''"/>
          </template>
        </UInput>

        <UButton icon="i-heroicons-arrow-path" class="cursor-pointer" :disabled="technology.length < 2"
                 :loading="loading" @click="fetchGraphData">
          Buscar
        </UButton>
      </div>
    </div>

    <div class="flex-1 relative bg-gray-50 dark:bg-gray-950 overflow-hidden">
      <VueFlow v-if="graph" class="h-full w-full" :nodes="getNodes" :edges="getEdges" :default-viewport="{ zoom: 0.8 }"
               :min-zoom="0.1" :max-zoom="4" fit-view-on-init>
        <template #node-special="specialNodeProps">
          <SpecialNode v-bind="specialNodeProps" :color="colorGraph"/>
        </template>

        <template #edge-special="specialEdgeProps">
          <SpecialEdge v-bind="specialEdgeProps"/>
        </template>

        <div class="absolute inset-0 -z-10 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
             style="background-image: radial-gradient(#6b7280 1px, transparent 1px); background-size: 20px 20px;">
        </div>
      </VueFlow>

      <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
        <div class="p-4 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
          <UIcon name="i-heroicons-cube-transparent" class="w-16 h-16 text-gray-300 dark:text-gray-700"/>
        </div>
        <h3 class="text-lg font-semibold text-gray-600 dark:text-gray-300">Nenhum grafo carregado.</h3>
        <p class="text-sm">Insira o nome de uma tecnologia acima para gerar seu roteiro.</p>
      </div>

      <div v-if="graph"
           class="absolute bottom-6 right-6 flex flex-col gap-2 p-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
        <UTooltip text="Zoom In" :popper="{ placement: 'left' }">
          <UButton class="cursor-pointer" icon="i-heroicons-plus" color="gray" variant="ghost" size="sm"
                   @click="() => { zoomIn() }" square/>
        </UTooltip>
        <UTooltip text="Zoom Out" :popper="{ placement: 'left' }">
          <UButton class="cursor-pointer" icon="i-heroicons-minus" color="gray" variant="ghost" size="sm"
                   @click="() => { zoomOut() }" square/>
        </UTooltip>
        <div class="h-px w-full bg-gray-200 dark:bg-gray-700 my-0.5"></div>
        <UTooltip text="Fit View" :popper="{ placement: 'left' }">
          <UButton class="cursor-pointer" icon="i-heroicons-arrows-pointing-out" color="gray" variant="ghost" size="sm"
                   @click="() => { fitView() }" square/>
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import type {IGraph} from '@/interfaces/IGraph'
import SpecialNode from "@/components/graphs/SpecialNode.vue"
import SpecialEdge from "@/components/graphs/SpecialEdge.vue"
import {VueFlow, useVueFlow, MarkerType} from '@vue-flow/core'
import {createAxiosInstance} from "@/network/axios-instance.ts"

const toast = useToast();
const graph = ref<IGraph>()
const loading = ref(false)
const technology = ref<string>("")
const axiosInstance = createAxiosInstance()
const colorGraph = ref<string>("green");
const {zoomIn, zoomOut, fitView} = useVueFlow()
const lastRoadmapSearched = ref<string>("");

const getEdges = computed(() => {
  return graph.value?.edges.map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: 'default',
      markerEnd: MarkerType.ArrowClosed,
      animated: false,
      style: {
        stroke: '#94a3b8',
        strokeWidth: 1.5
      },
      data: {hello: edge.content}
    }
  }) ?? []
})

const getNodes = computed(() => {
  return graph.value?.nodes.map((node) => {
    return {
      id: node.id,
      position: {x: node.positionX, y: node.positionY},
      data: {label: node.content},
      type: node.type
    }
  }) ?? []
})

function checksIfIsNewTechnology(): boolean {
  return lastRoadmapSearched.value.toLowerCase() !== technology.value.toLocaleLowerCase();
}

async function fetchGraphData() {
  if (!checksIfIsNewTechnology()) return;

  if (!technology.value.trim() || technology.value.length < 2) {
    toast.add({
      title: 'Feedback',
      description: "A palavra pesquisada precisa conter ao menos 2 letras.",
      icon: 'i-lucide-triangle-alert'
    })
    return
  }

  loading.value = true
  try {
    const response = await axiosInstance.get(`graph?technology=${technology.value}&idUser=admin`, {
      // TODO: remover autenticação dessa maneira, pós implementação de autenticação JWT no back
      auth: {
        username: 'admin',
        password: 'admin'
      }
    })

    if (response.data.nodes.length === 0) {
      toast.add({
        title: "Feedback",
        description: "Tecnologia pesquisada não possui um roteiro, busque por outra stack.",
        icon: 'i-lucide-info'
      })
      return;
    }

    graph.value = response.data

    lastRoadmapSearched.value = response.data.nodes[0].content

    colorGraph.value = response.data.nodes[0].color

    setTimeout(() => {
      fitView({padding: 0.2})
    }, 50)
  } catch (error) {
    console.error('Failed to fetch graph:', error)
  } finally {
    loading.value = false
  }
}
</script>