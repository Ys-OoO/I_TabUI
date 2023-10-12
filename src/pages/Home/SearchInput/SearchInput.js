import { BaiduIcon, GithubIcon } from '@/components/icons'
import { Select, Space, Input } from 'antd'
import React, { useState } from 'react'
import _ from 'lodash';
import { isRelNull } from '@/utils/common';

const defaultSearchConfig = [
  {
    value: 'baidu',
    label: <BaiduIcon />,
    addonBefore: 'https://www.baidu.com/s?tn=39042058_40_oem_dg&ie=utf-8&wd='
  },
  {
    value: 'github',
    label: <GithubIcon />,
    addonBefore: 'https://github.com/search?q=',
    addonAfter: '&type=repositories'
  }
]

export default function SearchInput({ otherSearchConfig = [], inputProps, selectProps, ...props }) {
  const searchConfig = [
    ...defaultSearchConfig,
    ...otherSearchConfig
  ]
  const [currentSearchSite, setCurrentSearchSite] = useState('baidu');
  const [searchValue, setSearchValue] = useState(null);
  const onSearch = (value, e, { source }) => {
    if (isRelNull(value) || source === 'clear') {
      return;
    }
    _.forEach(searchConfig, (o) => {
      if (o.value === currentSearchSite) {
        window.open(o?.addonBefore + encodeURIComponent(value) + (o?.addonAfter || ''), '_blank', 'noopener,noreferrer');
        setSearchValue(null);
        return;
      }
    })
  }

  return (
    <Space.Compact size='large' {...props}>
      <Select defaultValue="baidu" options={searchConfig} value={currentSearchSite} onChange={(value) => { setCurrentSearchSite(value) }} {...selectProps} />
      <Input.Search placeholder='输入搜索内容' allowClear onSearch={onSearch} value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} {...inputProps} />
    </Space.Compact>
  )
}
