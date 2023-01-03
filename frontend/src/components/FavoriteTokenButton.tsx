import HeartPlusIcon from './icons/heartPlusIcon';
import FavoriteFullIcon from './icons/favoriteFullIcon';
import { useLikes, LikeAction } from '@/store/useLikes';

const iconProps = {
  w: { base: '25px' },
  style: { position: 'relative', bottom: '0.3em'}
}

export type FavoriteButtonProps = LikeAction

export default function FavoriteTokenButton(props:FavoriteButtonProps) {
  const { likesToken, likeToken, unlikeToken } = useLikes();
  
  return (
    likesToken(props) !== null
      ? <FavoriteFullIcon {... iconProps} color="#FF4850" onClick={() => unlikeToken(props)} />
      : <HeartPlusIcon {... iconProps} onClick={() => likeToken(props)} />
  )
};