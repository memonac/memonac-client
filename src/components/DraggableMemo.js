import React, { memo } from "react";
import { useDrag } from "react-dnd";

//left top은 클릭한 곳 기준이 0, 0이 되는 것 같음 (드래그 했을때의 효과를 주는 것)
function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
    position: "absolute",
    transform,
    opacity: isDragging ? 0 : 1,
    height: isDragging ? 0 : "",
  };
}

export const DraggableMemo = memo(function DraggableMemo({
  id,
  children,
  left,
  top,
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "memo",
      item: { id, left, top, children },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top, children]
  );

  console.log("draggable memo...", id, left, top, children);
  return (
    <div
      ref={drag}
      style={getStyles(left, top, isDragging)}
      role="DraggableMemo"
    >
      {children}
    </div>
  );
});
