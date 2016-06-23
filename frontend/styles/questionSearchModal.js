module.exports = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.5)',
    zIndex            : 5
  },
  content : {
    position                   : 'absolute',
    top                        : '0',
    left                       : '0',
    right                      : '0',
    bottom                     : '0',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'none',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '3px',
    outline                    : 'none',
    padding                    : '20px 0 0 0',
    margin                     : '0 auto',
    width                      : '100%',
    height                     : '30px',
    zIndex                     : 5
  }
};
