export const getUUID = () => Math.random().toString().slice(2)

export const eventBoundary = (event: any) => {
  // ! https://github.com/facebook/react/issues/11387#issuecomment-355258340
  event.stopPropagation()
}
