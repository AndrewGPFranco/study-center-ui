export interface IGraph {
    nodes: Node[]
    edges: Edge[]
}

interface Node {
    id: string
    type: string
    color: string
    content: string
    positionX: number
    positionY: number
}

interface Edge {
    id: string
    source: string
    target: string
    content: string
}