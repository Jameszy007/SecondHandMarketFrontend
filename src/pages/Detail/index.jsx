import { useParams } from 'react-router-dom'
export default function Detail() {
  const { id } = useParams()
  console.log('render: Detail', id)
  return <h1>Detail #{id}</h1>
}