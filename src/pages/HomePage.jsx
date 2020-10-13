import React, { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import '../styles/homepage.css'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap'
import Fuse from 'fuse.js'
import Axios from 'axios'
import { Modal } from 'antd';
import { Link } from 'react-router-dom'
import { UserOutlined, UpCircleOutlined, FileImageOutlined } from '@ant-design/icons'

const HomePage = () => {

    const[files, setData] = useState('')
    const[searchedFiles, setSearchFiles] = useState('')
    const[searchQuery, setQuery] = useState('')
    const[visible, setVisible] = useState(false);
    const[imageData, setFile] = useState('')

    useEffect( ()=>{
        Axios.get(`https://www.reddit.com/r/pics/.json?jsonp=`).then( response => {
            setData(response.data.data.children)
        }).catch(() => setData(' '))
    },[])

    let fuse = ""

    if(files){
        fuse = new Fuse( files, {
            keys : [
                'data.title'
            ]
        })
    }
    
    const results = fuse.search(searchQuery)
    
    useEffect(()=>{
        setSearchFiles(results)
    }, [searchQuery])
    
    console.log(searchedFiles)

    const handleClick = (index) => {
        if(searchedFiles.length !==0 && searchedFiles !== 0){
            setFile(searchedFiles[index].item.data)
        }else if(files){
            setFile(files[index].data)
        }
        setVisible(true)
    }

    var elem = ''
    var posts = ''
    
    if(searchedFiles.length !==0 && searchedFiles !== 0){
        posts = searchedFiles
    }else if( files ){
        posts = files
    }

    return (
        <>
            <div className='homepage-container'>
                {
                    posts ?
                    <>
                        <div className='search-container'>
                            <input type="text" placeholder='search it up' value={searchQuery} onChange={ e => setQuery(e.target.value) }/>
                        </div>
                        <div className='row' style={{ width : '95%', margin : 'auto' }}>
                            {
                                posts.map( (el, index) =>{
                                    elem = el.item ? el.item : el
                                    return(
                                        <div key={index} className="col-lg-3 col-md-6 col-sm-12">
                                            <Link to='/' onClick={() => handleClick(index)}>
                                                <Card style={{ minHeight : '22vw' }}>
                                                    <CardImg top width="100%" style={{ padding : '20px', height: '15vw', objectFit : 'cover'}} src={elem.data.thumbnail} />
                                                    <CardBody>
                                                        <CardTitle style={{ 
                                                            textAlign : "center",
                                                            fontWeight: 700,
                                                            fontSize: '18px',
                                                            fontFamily: 'Caveat, cursive'
                                                        }}>{elem.data.title}</CardTitle>
                                                    </CardBody>
                                                </Card>
                                            </Link>
                                        </div> 
                                )})  
                            }                 
                        </div>
                    </>
                    :
                    <Loading/>            
                }
            </div>

            {
                imageData 
                ?
                    <Modal
                        title={imageData.title}
                        centered
                        footer={null}
                        visible={visible}
                        onOk={() => setVisible(false)}
                        onCancel={() => setVisible(false)}
                        width={1000}
                        className='image-modal'
                    >
                        <div className='image-container'>
                            <div className='image-crop'><img src={imageData.preview.images[0].source.url.replace('amp;s', 's')} alt=""/></div>
                            <div className='image-details-conatiner'>
                                <div className='image-details'>
                                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                                        <UserOutlined/>
                                        <p>{imageData.author_fullname}</p>
                                    </div>
                                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                                        <FileImageOutlined/>    
                                        <p>{imageData.content_categories}</p>
                                    </div>
                                    <div style={{ display : 'flex', justifyContent : 'space-between' }}>
                                        <UpCircleOutlined/>
                                        <p>{imageData.ups}</p>
                                    </div>
                                </div>
                            </div>
                        </div>        
                    </Modal>
                : null 
            }  
        </>
    )
}

export default HomePage
