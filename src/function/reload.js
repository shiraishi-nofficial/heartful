const reload = (num) => {
    const reloadFunc = () => {
        window.location.reload();
    }
    setTimeout(reloadFunc, num);
}

export default reload;