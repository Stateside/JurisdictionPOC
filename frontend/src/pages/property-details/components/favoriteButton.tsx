import HeartPlusIcon from '@/components/icons/heartPlusIcon';
import FavoriteFullIcon from '@/components/icons/favoriteFullIcon';
import { useContext } from 'react';
import { PropertyDetailsContext } from '../PropertyDetailsContext';

const iconProps = {
  w: { base: '25px' },
  style: { position: 'relative', bottom: '0.3em'}
}

// const fullIconStyle

export default function FavoriteButton() {
  const {
    favorited,
    toggleFavorite
  } = useContext(PropertyDetailsContext);

  return favorited ? <FavoriteFullIcon {... iconProps} color="#FF4850" onClick={toggleFavorite} /> : <HeartPlusIcon {... iconProps} onClick={toggleFavorite}/>
};