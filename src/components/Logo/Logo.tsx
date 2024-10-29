import { Media } from '@/payload-types'

type Props = {
  image: number | Media | null | undefined
}

export const Logo = ({ image }: Props) => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="BW Logo"
      height="90"
      width="90"
      // @ts-ignore
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}${image?.url}`}
    />
  )
}
