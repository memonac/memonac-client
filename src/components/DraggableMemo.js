import React, { memo } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";

function getStyles(left, top, isDragging) {
  const transform = `translate3d(${left}px, ${top}px, 0)`;

  return {
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
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );

  return (
    <div ref={drag} style={getStyles(left, top, isDragging)}>
      {children}
    </div>
  );
});

DraggableMemo.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
};
