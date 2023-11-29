import {styled} from "@/styles";

const Button = styled('button', {
  backgroundColor: '$rocketseat',
  borderRadius: '6px',
  fontSize: '13px',
  padding: '10px 15px',
  '&:hover': {
    filter: 'brightness(0.9)',
  },
});

export default function Home() {
  return (
 <Button>aki</Button>
  )
}
