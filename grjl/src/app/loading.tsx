import Loading from '@/components/ui/Loading'

export default function GlobalLoading() {
  return (
    <Loading 
      size="lg" 
      text="正在加载..." 
      fullScreen={true} 
    />
  )
}
