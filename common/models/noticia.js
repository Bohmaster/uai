module.exports = function(Noticia) {
  Noticia.observe('before save', function dateStamp(ctx, next) {
    ctx.instance.creado = new Date();
    next();
  })
};
