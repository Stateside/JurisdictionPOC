import HeartPlusIcon from './icons/heartPlusIcon';
import FavoriteFullIcon from './icons/favoriteFullIcon';
import { useLikes, LikeAction } from '@/store/likes';

const iconProps = {
  w: { base: '25px' },
  style: { position: 'relative', bottom: '0.3em'}
}

export type FavoriteButtonProps = LikeAction

export default function FavoriteProposalButton(props:FavoriteButtonProps) {
  const { likesProposal, likeProposal, unlikeProposal } = useLikes();

  return (
    likesProposal(props) !== null
      ? <FavoriteFullIcon {... iconProps} color="#FF4850" onClick={() => unlikeProposal(props)} />
      : <HeartPlusIcon {... iconProps} onClick={() => likeProposal(props)} />
  )
};