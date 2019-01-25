// Adiciona os modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();


//Função para compilar o SASS e adicionar os prefixos // compressed / compact / expanded
function compilaSass() {
  return gulp
  .src('src/scss/*.scss')
  .pipe(sass({
    outputStyle: 'expanded'
  }))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.stream());
}

// Tarefa do Gulp para a função de SASS
gulp.task('sass', function(done){
  compilaSass();
  done();
});

// Função para iniciar o browser
function browser() {
  browserSync.init({
    // proxy: 'seilaoqvemaqui/'
    server: {
      baseDir: "./" // diretorio da raiz ./dist/
    }
  })
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch() {
  gulp.watch('src/scss/*.scss', compilaSass);
  gulp.watch(['*.html','*.php', './**/*.php']).on('change', browserSync.reload);
  //['*.html']
}

// Inicia a tarefa de Watch
gulp.task('watch', watch);

//Tarefa padrão do Gulp, que inicia o Watch e o Browser-sync // Aqui são os nomes que ficam nas tarefas
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass')); //'plugincss'
