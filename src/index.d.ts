declare interface Octree<T> {
    GetAllNodes(): T[]
    CreateNode(position: Vector3, object: T): unknown
    RadiusSearch(position: Vector3, radius: number): T[]
    KNearestNeighborsSearch(position: Vector3, k: number, radius: number): T
}

declare interface OctreeConstructor {
    new <T>(): Octree<T>
}

export = OctreeConstructor
