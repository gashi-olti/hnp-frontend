import * as React from 'react';
import tw, { styled } from 'twin.macro';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';

import { MediaItemType } from '@/interfaces/media.interface';

import MediaItem, { MediaItemProps } from './MediaItem';

type XYCoord = {
  x: number;
  y: number;
};

type DragItemProps = {
  index: number;
} & MediaItemType;

type Props = {
  name: string;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
} & DragItemProps &
  MediaItemProps;

const DragableItemWrapper = styled.div(() => [
  tw`relative cursor-move`,
  tw`after:(content[attr(data-index)] absolute -top-2 -left-2 inline-flex w-6 h-6 items-center justify-center bg-black text-white rounded-full text-xs)`,
]);

const DraggableMediaItem = React.memo(({ index, name, moveItem, ...mediaProps }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: `mediaItem-${name}`,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItemProps, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: `mediaItem-${name}`,
    item: () => ({ index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <DragableItemWrapper
      ref={ref}
      css={[isDragging && tw`opacity-40`]}
      data-index={isDragging ? '' : index + 1}
    >
      <MediaItem {...mediaProps} data-handler-id={handlerId} />
    </DragableItemWrapper>
  );
});

DraggableMediaItem.displayName = 'DraggableMediaItem';

export default DraggableMediaItem;
