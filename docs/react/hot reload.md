```js
if(module.hot){
    module.hot.accept(()=>{
        ReactDOM.render(<App />, document.getElementById('root'))
    })
}
```

