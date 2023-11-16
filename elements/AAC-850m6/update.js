function(instance, properties, context) {
    instance.data.doRefresh = properties.refresh
    if(instance.data.alreadyInit) return;
    else instance.data.alreadyInit = true;

  setIdleTimeout(
    1000 * properties.time,
    function () {
      instance.publishState("is_active", true);
      instance.data.doRefresh && location.reload();
    }
  );

  function setIdleTimeout(time, trigger) {
    let timerID = 0;
    function init() {
      timerID = setTimeout(r, time);
      document.addEventListener("mousemove", restartTimer);
      document.addEventListener("mousedown", restartTimer);
      document.addEventListener("keydown", restartTimer); 
      document.addEventListener("touchstart", restartTimer);
      document.addEventListener("scroll", restartTimer);
    }
    function r() {
       
      timerID = 0; 
      trigger();
    }
    function restartTimer() {
      instance.publishState("is_active", false);
      timerID && clearTimeout(timerID);
      document.removeEventListener("mousemove", restartTimer); 
      document.removeEventListener("mousedown", restartTimer); 
      document.removeEventListener("keydown", restartTimer);
      document.removeEventListener("touchstart", restartTimer); 
      document.removeEventListener("scroll", restartTimer);
      setTimeout(init, 1000);
    }
    init();
  }
}
