import { Link as ChakraLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
  
type Props = {
	[key: string]: any
  children: ReactNode
}
  
export const Link = (props: Props) => {
	const router = useRouter()
	const href = props.href
	const onClick = props.onClick

	const localProps = { ...props }
	delete localProps.href
	delete localProps.onClick

	return (
		<ChakraLink {...localProps as any} onClick={(...args) => {
			if (href)
				router.push(href)
			if (onClick)
				onClick(...args)
		}}>
			{props.children}
		</ChakraLink>)
}