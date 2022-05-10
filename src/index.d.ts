/**
 * Basic node interacting with the octree.
 */
declare interface OctreeNode<T> {
  /**
   * Finds the nearest neighbors to this node within the radius.
   *
   * @param k The number to retrieve
   * @param radius The radius to search in
   *
   * @returns An array with the objects found (including self), and an array with their squared distances.
   */
  KNearestNeighborsSearch<R extends T[]>(
    k: number,
    radius: number
  ): LuaTuple<[R, Record<keyof R, number>]>;

  /**
   * Returns the object stored in the octree.
   */
  GetObject(): T;

  /**
   * Finds the nearest neighbors to the octree node.
   *
   * @param radius The radius to search in
   *
   * @returns An array with the objects found, and an array with their squared distances.
   */
  RadiusSearch<R extends T[]>(
    radius: number
  ): LuaTuple<[R, Record<keyof R, T>]>;

  /**
   * Retrieves the position.
   */
  GetPosition(): Vector3;

  /**
   * Sets the position of the octree nodes and updates the octree accordingly.
   */
  SetPosition(position: Vector3): void;

  /**
   * Removes the `OctreeNode` from the octree.
   */
  Destroy(): void;
}

/**
 * Octree implementation. An octree is a data structure that allows for quick spatial data queries of static objects. For example, trees can be stored in an octree, and nearby trees could be found near the player.
 *
 * Octrees exists as a grid of nodes, which are subdivided in half in each axis, which results in 8 different regions. This recursively happens to a set depth.
 *
 * This allows for O(n) data storage and log(n) retrieval of nearby objects. With a large quantity of items in the octree, this can make data retrieval significantly faster.
 *
 * @see https://en.wikipedia.org/wiki/Octree
 */
declare interface Octree<T> {
  ClearAllNodes(): void;
  /**
   * Returns all octree nodes stored in the octree!
   *
   * Order is not guaranteed.
   *
   * **Warning:** If you have 100,000 nodes in your octree, this is going to be very slow.
   */
  GetAllNodes(): OctreeNode<T>[];
  /**
   * Creates a new `OctreeNode` at the given position which can be retrieved.
   */
  CreateNode(position: Vector3, object: T): OctreeNode<T>;
  /**
   * Searches at the position and radius for any objects that may be within this radius.
   *
   * @returns An array with the objects found, and an array with their squared distances.
   */
  RadiusSearch<R extends T[]>(
    position: Vector3,
    radius: number
  ): LuaTuple<[R, Record<keyof R, number>]>;
  /**
   * Searches at the position and radius for any objects that may be within this radius. Returns the knearest entries.
   *
   * The closest entities will be first in the list.
   *
   * @param k Number of objects to find
   * @returns An array with the objects found, and an array with their squared distances.
   */
  KNearestNeighborsSearch<R extends T[]>(
    position: Vector3,
    k: number,
    radius: number
  ): LuaTuple<[R, Record<keyof R, number>]>;
}

declare interface OctreeConstructor {
  /**
   * Constructs a new Octree.
   */
  new <T>(): Octree<T>;
}

declare const Octree: OctreeConstructor;
export = Octree;
