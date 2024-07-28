import './DetailItem.css';

interface DetailItemProps {
  item: string;
  value: string | undefined;
}

export default function DetailItem({ item, value }: DetailItemProps) {
  return (
    <p>
      <span className={'detail__content--key'}>{item}: </span>
      <span className={'detail__content--value'}>{value}</span>
    </p>
  );
}
