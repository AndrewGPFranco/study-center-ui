<template>
  <div style="height: 80vh; width: 50%; background-color: aquamarine;">
    <VueFlow :nodes="getNodes" :edges="getEdges">
      <template #node-special="specialNodeProps">
        <SpecialNode v-bind="specialNodeProps"/>
      </template>

      <template #edge-special="specialEdgeProps">
        <SpecialEdge v-bind="specialEdgeProps"/>
      </template>
    </VueFlow>
  </div>
  <div>
    <input v-model="technology" type="text" placeholder="Tecnologia"></input>
    <button @click="fetchGraphData(technology)">Buscar Roadmap</button>
  </div>
</template>

<script setup lang="ts">
import {VueFlow} from '@vue-flow/core'
import {computed, ref} from 'vue'
import type {IGraph} from '@/interfaces/IGraph';
import SpecialNode from "@/components/graphs/SpecialNode.vue";
import SpecialEdge from "@/components/graphs/SpecialEdge.vue";
import {createAxiosInstance} from "@/network/axios-instance.ts";

const graph = ref<IGraph>();
const technology = ref<string>("");
const axiosInstance = createAxiosInstance();

const getEdges = computed(() => {
  return graph.value?.edges.map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target
    };
  }) ?? [];
});

const getNodes = computed(() => {
  return graph.value?.nodes.map((node) => {
    return {
      id: node.id,
      position: {x: node.positionX, y: node.positionY},
      data: {label: node.content},
      type: node.type
    };
  }) ?? [];
});

async function fetchGraphData(technology: string) {
  const response = await axiosInstance.get(`graph?technology=${technology}`, {
    auth: {
      username: 'admin',
      password: 'admin'
    }
  });

  graph.value = response.data;
}
</script>