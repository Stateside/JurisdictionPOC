import { mineBlocks } from '@/utils/mine-blocks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import usePersona, { PersonaType } from '../store/usePersona';

export interface MenuItemInterface {
  label: string;
  url?: string;
  command?: string;
  action?: ()=>Promise<void>;
  actionMsg?: string;
  children?: Array<MenuItemInterface>;
}

export interface MenuCandidateInterface extends MenuItemInterface {
  isVisible?: () => boolean;
}

const useMenu = () => {
  const router = useRouter()
  const persona = usePersona()
  
  const menu:Array<MenuItemInterface> = useMemo(() => {
    const menu = [
        {label: 'Show Owner View', url: '', action: async () => persona.set(router, PersonaType.Owner), isVisible: persona.isMemberPersona},
        {label: 'Show Member View', url: '', action: async () => persona.set(router, PersonaType.Member), isVisible: persona.isOwnerPersona},
        {label: 'Create a Jurisdiction', url: '/jurisdiction/create', command: '⌘J', isVisible: persona.isMemberPersona},
        {label: 'Show Sample Accounts', url: '/accounts', command: '⌘A'},
        {label: 'divider1', isVisible: () => process.env.NEXT_PUBLIC_CHAIN_ID==="31337" && persona.isMemberPersona()},
        {label: 'Time Travel', isVisible:() => process.env.NEXT_PUBLIC_CHAIN_ID==="31337" && persona.isMemberPersona(), children: [
            {label: 'Mine 1 Block', url: '', action:() => mineBlocks(1), actionMsg:"Mined 1 block", command: '⌘1'},
            {label: 'Mine 2 Blocks', url: '', action:() => mineBlocks(2), actionMsg:"Mined 2 blocks", command: '⌘2'},
            {label: 'Mine 4 Blocks', url: '', action:() => mineBlocks(4), actionMsg:"Mined 4 blocks", command: '⌘4'},
            {label: 'Mine 8 Blocks', url: '', action:() => mineBlocks(8), actionMsg:"Mined 8 blocks", command: '⌘8'},
            {label: 'Mine 16 Blocks', url: '', action:() => mineBlocks(16), actionMsg:"Mined 16 blocks", command: '⌘6'},
            {label: 'Mine 32 Blocks', url: '', action:() => mineBlocks(32), actionMsg:"Mined 32 blocks", command: '⌘3'},
        ]}
      ]
    return menu.filter((item) => {
      if (item.isVisible) {
        return item.isVisible()
      }
      return true
    })
  }, [persona])

  return menu
}
  
export default useMenu