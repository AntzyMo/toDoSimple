export default (state = {
  ctxBg:'#fff'
}, {type,val}) => {

  switch (type) {
    case 'setCtxBg':
      return state.ctxBg=val
    default:
      return state
  }
}
