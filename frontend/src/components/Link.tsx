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

	const localProps = { ...props }
	delete localProps.href

	return (
		<ChakraLink {...localProps as any} onClick={() => router.push(href)}>
			{props.children}
		</ChakraLink>)
}