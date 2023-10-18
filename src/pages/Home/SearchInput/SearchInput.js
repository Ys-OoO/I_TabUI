import { BaiduIcon, GithubIcon } from '@/components/icons'
import { Select, Space, Input, List } from 'antd'
import React, { useEffect, useState } from 'react'
import _ from 'lodash';
import { isRelNull } from '@/utils/common';
import jsonp from 'fetch-jsonp';
import style from '../style.less'
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
  const [data, setData] = useState(null);
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

  //通过jsonp获取百度提供的搜索下拉词
  const fetchData = () => {
    if (searchValue && currentSearchSite === 'baidu') {
      jsonp(`https://www.baidu.com/sugrec?&prod=pc&wd=${searchValue}`)
        .then((res) => res.json())
        .then((d) => {
          if (d) {
            const { g } = d;
            if (g) {
              let dataList = g.map((item) => {
                return {
                  label: item.q,
                  value: item.sa,
                }
              });
              setData(dataList);
            }
          }
        })
    } else {
      setData(null);
    }

  };

  const getSearchValue = (e) => {
    const content = e.target.innerText;
    setSearchValue(content);
  }
  useEffect(() => {
    fetchData();
  }, [searchValue]);

  return (
    <div className={style.container}>
      <Space.Compact size='large' {...props}>
        <Select
          defaultValue="baidu"
          options={searchConfig}
          value={currentSearchSite}
          onChange={(value) => { setCurrentSearchSite(value) }}
          {...selectProps}
        />
        <Input.Search
          placeholder='输入搜索内容'
          allowClear
          onSearch={onSearch}
          value={searchValue}
          onChange={(e) => { setSearchValue(e.target.value) }}
          {...inputProps} />
      </Space.Compact>
      <div className={style.listContent}>
        {data && <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <a onClick={getSearchValue} style={{ color: '#ffff' }}>
                {item.label}
              </a>
            </List.Item>
          )}
        />}
      </div>
    </div>


  )
}
