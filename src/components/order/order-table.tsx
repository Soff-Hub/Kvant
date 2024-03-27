import { Table } from '@components/ui/table';
import ActionsButton from '@components/ui/action-button';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { addPeriodToThousands } from '@components/cart/cart-item';
import { useTranslation } from 'src/app/i18n/client';
import Alert from '@components/ui/alert';

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

const OrderTable: React.FC<{ orders?: any; lang: string }> = ({
  orders,
  lang,
}) => {
  const { t } = useTranslation(lang, 'home');

  const columns = [
    {
      title: t('Номер заказа'),
      dataIndex: 'id',
      key: 'id',
      className: 'id-cell',
      width: 100,
      heigth: 50,
    },
    {
      title: t('Тип заказа'),
      dataIndex: 'order_type_ln',
      key: 'order_type_ln',
      width: 140,
    },
    {
      title: t('Дата заказа'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 140,
      render: (items: any) => <span>{items}</span>,
    },
    {
      title: t('Положение дел'),
      key: 'status_ln',
      width: 145,
      dataIndex: 'status_ln',
      render: (status: string) => (
        <span>
          <span
            className="bullet"
            style={{
              backgroundColor:
                status === 'Approved' ||
                status === 'Одобренный' ||
                status === 'Tasdiqlandi'
                  ? 'green'
                  : status === 'Cancelled' ||
                      status === 'Отменено' ||
                      status === 'Bekor qilindi'
                    ? 'red'
                    : '',
            }}
          />
          {status}
        </span>
      ),
    },
    {
      title: t('Способ оплаты'),
      dataIndex: 'provider',
      key: 'provider',
      width: 140,
    },
    {
      title: t('Итоговая цена'),
      key: 'total_amount',
      width: 130,
      dataIndex: 'total_amount',
      render: (price: number) => (
        <span>
          {addPeriodToThousands(price)} {t('сум')}
        </span>
      ),
    },
    {
      title: t('Действие'),
      key: 'id',
      dataIndex: 'id',
      width: 100,
      render: function actionsButton(item: any) {
        return <ActionsButton item={item} lang={lang} />;
      },
    },
  ];

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          {t('Мои заказы')}
        </h2>
      </div>
      <div className="order-list-table-wraper ">
        {orders?.length > 0 ? (
          <Table className="order-list-table" columns={columns} data={orders} />
        ) : (
          <Alert message={`${t('Нет заказов')}`} />
        )}
      </div>
    </>
  );
};

export default OrderTable;
