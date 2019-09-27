package cn.enilu.guns.admin.modular.test;

import cn.enilu.guns.bean.entity.test.Boy;
import cn.enilu.guns.service.test.BoyService;

import cn.enilu.guns.bean.annotion.core.BussinessLog;
import cn.enilu.guns.bean.constant.factory.PageFactory;
import cn.enilu.guns.bean.dictmap.CommonDict;
import cn.enilu.guns.admin.core.base.controller.BaseController;
import cn.enilu.guns.bean.exception.GunsException;

import cn.enilu.guns.bean.vo.query.Page;
import cn.enilu.guns.bean.vo.query.SearchFilter;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/test/boy")
public class BoyController extends BaseController {
	private  Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private BoyService boyService;

	private static String PREFIX = "/test/boy/";

	/**
	* 跳转到首页
	*/
	@RequestMapping(value="",method = RequestMethod.GET)
		public String index() {
		return PREFIX + "index.html";
	}

	/**
	* 跳转到添加页面
	*/
	@RequestMapping(value = "/add",method = RequestMethod.GET)
		public String add() {
		return PREFIX + "add.html";
	}

	/**
	* 跳转到修改页面
	*/
	@RequestMapping("/edit/{id}")
	public String edit(@PathVariable Long id, Model model) {
		Boy entity = boyService.get(id);
		model.addAttribute("item",entity);
		return PREFIX + "edit.html";
	}
	@RequestMapping(value = "/list",method = RequestMethod.POST)
	@ResponseBody
	public Object list(@RequestParam(required = false) String name) {
		Page<Boy> page = new PageFactory<Boy>().defaultPage();
		page.addFilter("name", SearchFilter.Operator.EQ,name);
		page = boyService.queryPage(page);
		return super.packForBT(page);
	}
	/**
	* 新增男孩
	*/
	@RequestMapping(value = "/add",method = RequestMethod.POST)
	@ResponseBody
	@BussinessLog(value = "新增男孩", key = "name",dict= CommonDict.class)
	public Object add(Boy boy) {
		boyService.insert(boy);
		return SUCCESS_TIP;
	}

	/**
	* 删除男孩
	*/
	@RequestMapping(value = "/delete")
	@ResponseBody
	@BussinessLog(value = "删除男孩", key = "id",dict= CommonDict.class)
	public Object delete(@RequestParam Long id) {
		boyService.delete(id);
		return SUCCESS_TIP;
	}

	/**
	* 修改男孩
	*/
	@RequestMapping(value = "/update")
	@ResponseBody
	@BussinessLog(value = "修改男孩", key = "name",dict= CommonDict.class)
	public Object update(Boy boy) {
		boyService.update(boy);
		return SUCCESS_TIP;
	}

}