package cn.enilu.guns.service.test;


import cn.enilu.guns.bean.entity.test.Boy;
import cn.enilu.guns.dao.test.BoyRepository;

import cn.enilu.guns.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoyService extends BaseService<Boy,Long,BoyRepository>  {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private BoyRepository boyRepository;

}

