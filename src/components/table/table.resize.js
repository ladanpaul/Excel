import { $ } from '@core/dom';
export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === 'col' ? 'bottom' : 'right';
  let value = null;

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = e.pageX - coords.right;
      value = `${coords.width + delta}px`;
      $resizer.css({
        right: `${-delta}px`,
      });
    } else {
      const delta = e.pageY - coords.bottom;
      value = `${coords.height + delta}px`;
      $resizer.css({
        bottom: `${-delta}px`,
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (type == 'col') {
      $parent.css({
        width: value,
      });
      $root.findAll(`[data-col="${$parent.data.col}"]`).forEach((cell) => {
        cell.style.width = value;
      });
    } else {
      $parent.css({
        height: value,
      });
    }
    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    });
  };
}
