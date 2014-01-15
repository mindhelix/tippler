module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        
        // 2. Tasks
        less: {
          development: {
            options: {
              paths: ["public/css"],
              cleancss: true
            },
            files: {
              "public/css/style.css": "public/css/style.less",
              "public/css/login.css": "public/css/login.less"
            }
          }
        },
        watch: {
          scripts: {
            files: ['public/css/style.less', 'public/css/login.less'],
            tasks: ['less'],
            options: {
              spawn: false,
            },
          },
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['less']);

};