import {Ref} from "vue";

export type storage = {
  token: string
  schoolToken: string
  schoolUsername: string
}

export type refStorage = {
  token: Ref<string>
  schoolToken: Ref<string>
}

export interface BaseStorage {
  ():storage
}

// export interface StorageToRef {
//   (key: keyof storage): Ref
// }


declare const useStorage: BaseStorage


// export const storageToRef: StorageToRef
export default useStorage
