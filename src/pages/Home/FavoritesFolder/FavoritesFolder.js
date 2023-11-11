import CoverItem from '@/components/CoverSelector/CoverItem/CoverItem';
import { FlexAuto, FlexCenter, FlexColumn, MotionBox } from '@/components/styleBox';
import { db } from '@/utils/indexDBUtils/db';
import { CaretDownFilled, FolderAddTwoTone } from '@ant-design/icons';
import { useDispatch } from '@umijs/max';
import { Dropdown, Input, message } from 'antd';
import { useLiveQuery } from 'dexie-react-hooks';
import _ from 'lodash';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import styled from 'styled-components';
import style from './style.less';

const DropDownWrapper = styled.div`
  text-align:center;
  width:100%;
  font-size:15px;
  font-weight:550;
`

const FavoritesFolder = forwardRef(function FavoritesFolder({ folder = {}, index, count = 0, onClickDownArrow, ...props }, ref) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const singleFolderRef = useRef();
  const isLast = index + 1 === count;

  useImperativeHandle(ref, () => {
    return {
      currentFolderHeight: () => singleFolderRef.current.offsetHeight
    }
  }, [index]);

  const addSite = (e) => {
    dispatch({ type: 'home/save', config: { editVisible: true } })
  }
  const favoritesItem = useLiveQuery(() => {
    return db.favoritesItem.where({ folderId: folder.id }).toArray()
  }, [])

  const editFolder = (e) => {
    dispatch({
      type: 'home/change',
      config: {
        folderManage: true
      }
    })
  }

  const createFolder = async (e) => {
    const typeName = e.target.value;
    if (_.isEmpty(typeName.trim())) {
      return;
    }
    const existFolder = await db.favoritesFolder.where({ typeName }).toArray();
    if (existFolder.length > 0) {
      message.info('分类已存在，请重新命名🫥')
    }
    await db.favoritesFolder.add({ typeName });
  }

  const items = [
    {
      label: <DropDownWrapper >添加网址</DropDownWrapper>,
      key: 'addSite'
    },
    {
      label: <DropDownWrapper >编辑收藏夹</DropDownWrapper>,
      key: 'editFolder'
    },
  ];

  return (
    <>
      <Dropdown menu={{
        items,
        onClick: (item) => {
          if (item.key === "addSite")
            addSite()
          if (item.key === 'editFolder') editFolder()
        }
      }}
        trigger={['contextMenu']}
        {...props}
      >
        <FlexColumn className={style.folderBox} ref={singleFolderRef}>
          <div className={style.folderItemContainer}>
            {_.map(favoritesItem || [], (item, index) => {
              const src = item.cover.src;
              const text = item.cover.text;
              const type = item?.cover?.type;
              const coverInfo = { ...item, src, text, type }
              return <CoverItem key={index} coverInfo={coverInfo} onClick={() => {
                window.open(item.url);
              }} />
            })}
          </div>
          <FlexAuto />
          {
            isLast ? <FlexCenter className={style.folderBoxFooter} onClick={() => { setIsEdit(!isEdit) }}>
              <MotionBox whileHover={{ rotate: 360, transition: { duration: 0.5 } }}>
                <FolderAddTwoTone title='添加文件夹' />
              </MotionBox>
              {
                isEdit ?
                  <MotionBox className={style.folderInupt} animate={{ scale: [0, 1, 0.8, 1] }}>
                    <Input onPressEnter={createFolder} placeholder='输入新分类，回车创建' autoFocus />
                  </MotionBox>
                  : undefined
              }
            </FlexCenter> : <MotionBox
              animate={{
                y: -10,
                transition: {
                  repeat: Infinity,
                  repeatType: 'mirror',
                  duration: 2,
                },
              }}
              onClick={() => { onClickDownArrow && onClickDownArrow(index) }}
            >
              <CaretDownFilled style={{ color: '#FFF', fontSize: '50px' }} />
            </MotionBox>
          }
        </FlexColumn>

      </Dropdown >
    </>
  )
})
// export default function FavoritesFolder({ folder = {}, isLast = false, ...props }) {

// }

export default FavoritesFolder;
