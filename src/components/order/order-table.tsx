import { Table } from '@components/ui/table';
import ActionsButton from '@components/ui/action-button';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { addPeriodToThousands } from '@components/cart/cart-item';

export const CreatedAt: React.FC<{ createdAt?: any }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

const columns = [
  {
    title: 'Номер заказа',
    dataIndex: 'id',
    key: 'id',
    className: 'id-cell',
    width: 100,
  },
  {
    title: 'Тип заказа',
    dataIndex: 'order_type_ln',
    key: 'order_type_ln',
    className: 'id-cell',
    width: 140,
  },
  {
    title: 'Дата заказа',
    dataIndex: 'created_at',
    key: 'created_at',
    width: 140,
    render: (items: any) => <span>{items}</span>,
  },
  {
    title: 'Положение дел',
    key: 'status_ln',
    width: 145,
    dataIndex: 'status_ln',
    render: (status: string) => (
      <span>
        <span
          className="bullet"
          style={{ backgroundColor: status === 'Approved' ? 'green' : 'red' }}
        />
        {status}
      </span>
    ),
  },
  {
    title: 'Способ оплаты',
    dataIndex: 'provider',
    key: 'provider',
    width: 140,
  },
  {
    title: 'Итоговая цена',
    key: 'total_amount',
    width: 130,
    dataIndex: 'total_amount',
    render: (price: number) => <span>{addPeriodToThousands(price)} so'm</span>,
  },
  {
    title: 'Действие',
    key: 'id',
    dataIndex: 'id',
    width: 100,
    render: function actionsButton(item: any) {
      return <ActionsButton  item={item} />;
    },
    className: 'operations-cell',
  },
];

const OrderTable: React.FC<{ orders?: any; lang: string }> = ({
  orders,
  lang,
}) => {
  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          Мой список заказов
        </h2>
      </div>
      <div className="order-list-table-wraper " >
        <Table className="order-list-table " columns={columns} data={orders} />
      </div>
    </>
  );
};

export default OrderTable;
