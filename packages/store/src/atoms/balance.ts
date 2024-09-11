import { atom } from 'recoil'

export const balanceAtom = atom<number>({
  key: "balanceAtom",
  default: 0
})