import CoverSelector from '@/components/CoverSelector';
import { EditTwoTone, PlusSquareTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Input, Modal } from 'antd';
import _ from 'lodash';
import { useState } from 'react';

export default function EditFavoriteItemModal() {
  const disptch = useDispatch();
  const { editVisible, currentItem } = useSelector(state => state.home);
  const { dbPromise } = useSelector(state => state.indexedDB);

  const [src, setSrc] = useState(null);
  const [form] = Form.useForm();

  const onSave = async () => {
    const favoriteItem = await form.validateFields().then(() => {
      return form.getFieldsValue()
    }).catch();
    //TODO 保存到IndexedDb
    // dbPromise.then((db) => {
    //   upsertData(db, "favoritesFolder", favoriteItem);
    // })
  }

  const addressValidator = (_, value) => {
    if (!value) {
      return Promise.reject("请填写地址");
    }
    const regUrl = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~/])+$/;
    if (regUrl.test(value.trim())) {
      return Promise.resolve();
    }
    return Promise.reject("地址有误");
  }

  const getCover = _.debounce(async (e) => {
    const address = e.target.value;
    //目前该接口直接返回图片，为此我们模拟获取到了Url，获取一次仅仅充当测试地址是否可获取favico
    // const result = await addressValidator(null, address)
    //   .then(() => {
    //     const params = {
    //       url: e.target.value
    //     }

    //     const res = axios.get(`https://api.7585.net.cn/getico/api.php?${stringify(params)}`);
    //     return res;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     message.info("获取失败,请检查地址或使用Text图标");
    //   });
    setSrc(`https://api.7585.net.cn/getico/api.php?url=${address}`);
  }, 500)

  return (
    <Modal
      open={editVisible}
      onCancel={() => {
        disptch({ type: 'home/save', config: { editVisible: false } })
        form.resetFields();
        setSrc("")
      }}
      footer={[<Button key="save" type='primary' size='large' onClick={onSave}>Save</Button>]}
      title={
        currentItem ?
          <><EditTwoTone style={{ marginRight: 8 }} /> 编辑收藏项</> :
          <><PlusSquareTwoTone style={{ marginRight: 8 }} /> 添加收藏项</>
      }
    >
      <Form name='favoritItem' layout='vertical' size='large' form={form} requiredMark={false} validateTrigger="onSubmit">
        <Form.Item label="网址" name="url" rules={[{ required: true, validator: addressValidator }]}  >
          <Input placeholder='https://...' allowClear onChange={getCover} />
        </Form.Item>
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
        <Form.Item label="图标" name="cover" rules={[{ required: true }]}>
          <CoverSelector src={src} />
        </Form.Item>
      </Form>
    </Modal >
  )
}
