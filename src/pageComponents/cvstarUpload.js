import React, { useState,useEffect } from 'react'
import { Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios'
import './product-add.css'

function getBase64(imgData, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        //处理图片
        const canvas = document.createElement('canvas');
        const img = document.createElement('img')
        img.src = reader.result
        img.onload = () => {
            let originW = img.width;
            let originH = img.height;

            //   console.log("原始尺寸：" + originW + "/" + originH);

            let targetW, targetH;
            targetW = targetH = 200;
            //如果宽高比大于1则重新计算高度，保证不变形
            if (originW / originH > 1) {
                targetH = Math.round((originH / originW) * targetW);
            } else {
                targetW = Math.round((originW / originH) * targetH);
            }
            //   console.log("压缩尺寸：" + targetW + "/" + targetH);
            //借助canvas压缩图片
            let context = canvas.getContext("2d");

            canvas.width = targetW;
            canvas.height = targetH;

            context.clearRect(0, 0, targetW, targetH);
            context.drawImage(img, 0, 0, targetW, targetH);

            let image = canvas.toDataURL("image/jpeg", 0.92);
            callback(image)
        }

    })
    reader.readAsDataURL(imgData)
}

export default function CvstarUpload(props) {

    const [uploadData, setUpload] = useState({
        imageUrl: props.value,
        loading:false,
    })
  useEffect(()=>{
      setUpload({
          imageUrl:props.value,
          loading:false
      })
  },[props.value])
    const uploadButton = (
        <div className='upload-content'>
            {uploadData.loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>上传图片</div>
        </div>
    )
    const onChange = ({file,fileList})=>{
        if(file.status === 'uploading'){
            setUpload({
                imageUrl:null,
                loading:true
            })
        }
        // console.log('当前的文件列表：',fileList)
        // props.onChange({fileList:[...fileList]})
    }
    const customRequest = ({ action, file }) => {
        //检测图片类型和大小
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('请上传jpeg或png格式的图片!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('图片的必须小于2MB!');
        }
        if (isJpgOrPng && isLt2M) {
            //通过检测后上传图片
            getBase64(file, async (imageUrl) => {
                setUpload({
                    imageUrl,
                    loading: false
                })
                const imageData = {
                    pic: imageUrl,
                    id: file.uid
                }
                let { data } = await axios.post(action, imageData)
                let { pic } = data
                
                //拿到从服务器返回的地址
                
                props.onChange(pic)
            })
        }
        // console.log('文件：', file)


    }
    const uploadProps = {
        nama:'pic',
        fileList:props.value,
        listType:'picture-card',
        className:'pic-upload',
        showUploadList:false,
        onStart(){
          //重写并覆盖onStar方法，否则会出错  
        },
        onChange,
        action:'/api/uploadPic',
        customRequest,
    }
    return <div>
        <Upload
        {...uploadProps}
        >
            {uploadData.imageUrl ? <img src={uploadData.imageUrl} alt='商品图片' style={{ transform:'translateX(-15px)',width: '100px' }} /> : uploadButton}
        </Upload>
    </div>
}