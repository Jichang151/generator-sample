// 此文件作为 Generator 的核心入口
// 需要导出一个继承自 yeoman-generator 的类型
// Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法来实现一些功能，例如文件写入

const Generator = require('yeoman-generator')

module.exports = class extends Generator{ 
  // 命令行交互
  prompting () {
    // yeoman 在询问用户环节会自动调用此方法
    // 在此方法中可以调用父类的 prompt() 方法，发出对用户的命令行询问
    // 返回一个 Promise
    // return 异步流程控制
    // 参数是一个数组，数组的每一项都是一个问题对象
    return this.prompt([
      {
        type: 'input',  //使用用户输入的方式提交信息
        name: 'name', //最终得到结果的一个键
        message: 'your project name', //界面上给用户的问题
        default: this.appname,  //当前生成项目这个目录的文件夹的名字，默认值 
      } 
    ])
    .then(answers => {
      // answers =》 { name: 'user input value' } 当前问题在接受完用户输入后的结果
      this.answers = answers  //挂载到 this 上，方便 writing 里使用
    })
  }
  // yeoman 自动在生成文件阶段调用此方法
  // 这里我们尝试往项目中写入文件
  writing () {
    // write两个参数：写入文件的绝对路径，写入文件的内容
    // this.fs.write(
    //   this.destinationPath('temp.txt'),
    //   Math.random().toString()
    // )

    // 有模板时 我们就不在借助于 write 方法来写入文件
    // 而是通过模板方式写入文件到目录

    // 模板文件路径
    const tmpl = this.templatePath('bar.html')
    // 输出路径
    const output = this.destinationPath('bar.html')
    // 模板数据上下文
    // const context = { title: 'hello world~', success: false }
    const context = this.answers

    this.fs.copyTpl(tmpl, output, context)
  }
}
