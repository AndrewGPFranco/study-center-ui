export interface IGraph {
    nodes: Node[]
    edges: Edge[]
}

interface Node {
    id: string
    positionX: number
    positionY: number
    content: string,
    type: string
}

interface Edge {
    id: string
    source: string
    target: string
    content: string
}