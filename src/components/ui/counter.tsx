import cn from 'classnames';
import MinusIcon from '@components/icons/minus-icon';
import PlusIcon from '@components/icons/plus-icon';
import { useTranslation } from 'src/app/i18n/client';

type ButtonEvent = (
  e: React.MouseEvent<HTMLButtonElement | MouseEvent>,
) => void;

type CounterProps = {
  lang: string;
  value: number;
  variant?: 'mercury' | 'cart' | 'single' | 'venus';
  onDecrement: ButtonEvent;
  onIncrement: ButtonEvent;
  className?: string;
  disabled?: boolean;
};

const Counter: React.FC<CounterProps> = ({
  lang,
  value,
  variant = 'mercury',
  onDecrement,
  onIncrement,
  className,
  disabled,
}) => {
  const size = variant === 'single' ? '22' : '14';
  const { t } = useTranslation(lang, 'home');
  return (
    <div
      className={cn(
        'button--mutiqty  flex items-center justify-between rounded overflow-hidden shrink-0 ',
        {
          'h-8 md:h-10 bg-brand shadow-counter rounded-3xl':
            variant === 'mercury',
          'h-11 md:h-14 bg-brand': variant === 'single',
          'inline-flex': variant === 'cart',
        },
        className,
      )}
    >
      <button
        onClick={onDecrement}
        className={cn(
          'flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
          {
            'w-8 md:w-12 h-8 rounded-2xl text-white text-heading ms-1':
              variant === 'mercury',
            '!w-10 !h-10 rounded-full transform scale-80 lg:scale-100 text-white  ltr:ml-auto rtl:mr-auto':
              variant === 'single',
            '!w-6 !h-6 pr-0 border border-border-three hover:bg-brand text-brand-muted hover:border-brand rounded-full hover:text-brand-light':
              variant === 'cart',
          },
        )}
      >
        <span className="sr-only">{t('button-minus')}</span>
        <MinusIcon width={size} height={size} opacity="1" />
      </button>
      <span
        className={cn(
          'font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default shrink-0',
          {
            'text-sm md:text-base w-6 text-white': variant === 'mercury',
            'text-base md:text-[17px] w-12 md:w-20 xl:w-28 text-white':
              variant === 'single',
            'text-15px w-9': variant === 'cart',
          },
        )}
      >
        {value}
      </span>

      {!disabled && (
        <button
          onClick={onIncrement}
          disabled={disabled}
          className={cn(
            'group flex items-center justify-center flex-shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none',
            {
              'w-8 md:w-12 h-8 rounded-2xl text-heading text-white me-1':
                variant === 'mercury',
              '!w-10 !h-10 rounded-full scale-80 lg:scale-100 text-heading text-white ltr:mr-auto rtl:ml-auto !pr-0 justify-center':
                variant === 'single',
              '!w-6 !h-6 border text-brand-muted border-border-three hover:bg-brand hover:border-brand rounded-full hover:text-brand-light !pr-0':
                variant === 'cart',
            },
          )}
        >
          <span className="sr-only">{t('button-plus')}</span>
          <PlusIcon width={size} height={size} opacity="1" />
        </button>
      )}
    </div>
  );
};

export default Counter;
