'use client';

import type { SwitchProps } from '@nextui-org/switch';
import type { FC } from 'react';
import { MoonFilledIcon, SunFilledIcon } from '@/components/icons';
import { useSwitch } from '@nextui-org/switch';
import { useIsSSR } from '@react-aria/ssr';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from 'clsx';

import { useTheme } from 'next-themes';

export type ThemeSwitchProps = {
  className?: string;
  classNames?: SwitchProps['classNames'];
};

export const ThemeSwitch: FC<ThemeSwitchProps> = ({
  className,
  classNames,
}) => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === 'political' ? setTheme('blossomTheme') : setTheme('political');
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    'isSelected': theme === 'political' || isSSR,
    'aria-label': `Switch to ${theme === 'political' || isSSR ? 'blossomTheme' : 'political'} mode`,
    onChange,
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'cursor-pointer px-px transition-opacity hover:opacity-80',
          className,
          classNames?.base,
        ),
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'size-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0',
            ],
            classNames?.wrapper,
          ),
        })}
      >
        {!isSelected || isSSR
          ? (
              <SunFilledIcon size={22} />
            )
          : (
              <MoonFilledIcon size={22} />
            )}
      </div>
    </Component>
  );
};
