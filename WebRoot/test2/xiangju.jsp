<%@ page language="java"
	import="java.sql.*,java.io.*,java.util.*,util.DBUtil,dao.userDao,entity.User"
	pageEncoding="utf-8" errorPage="errorPage.jsp"%>
<%@ page contentType="text/html;charset=utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String url = "http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath()
			+ request.getServletPath().substring(0, request.getServletPath().lastIndexOf("/") + 1)
			+ "pagerXiangJu";

	if (request.getQueryString() != null) {
		url += "?" + request.getQueryString();
	}
	session.setAttribute("url", url);
%>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>乡居管理</title>
<meta name="description" content="这是一个 index 页面">
<meta name="keywords" content="index">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="renderer" content="webkit">
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="icon" type="image/png" href="../i/favicon.png">
<link rel="apple-touch-icon-precomposed"
	href="../i/app-icon72x72@2x.png">
<meta name="apple-mobile-web-app-title" content="Amaze UI" />
<link rel="stylesheet" href="../css/amazeui.min.css" />
<link rel="stylesheet" href="../css/admin.css">
<link rel="stylesheet" href="../css/app.css">
<style type="text/css">
.pagination a {
	border-radius: 3px;
}

.pagination a, .pagination span {
	border-radius: 3px;
}
</style>
<script
	src="../js/sweetalert2.min.js"></script>
<link
	href="../css/sweetalert2.min.css"
	rel="stylesheet">
<script
	src="../js/core.js"></script>
<link href="../css/pagination.css" rel="stylesheet" type="text/css" />
<script src="../js/jquery-1.11.3.js"></script>
<script type="text/javascript" src="../js/jquery.pagination.js"></script>
<script type="text/javascript">

	// 点击分页按钮以后触发的动作
	function handlePaginationClick(new_page_index, pagination_container) {
		//alert(new_page_index + 1);
		$("#xiangju").attr("action", "<%=request.getContextPath()%>/test2/pagerXiangJu?pageNum=" + (new_page_index + 1));
		$("#xiangju").submit();
		return false;
	}

	$(function() {
		$("#News-Pagination").pagination(${totalPages}, {
			items_per_page : 9, // 每页显示多少条记录
			current_page : ${currentPage} - 1, // 当前显示第几页数据
			num_display_entries : 6, // 分页显示的条目数
			next_text : "下一页",
			prev_text : "上一页",
			num_edge_entries : 2, // 连接分页主体，显示的条目数
			callback : handlePaginationClick
		});
	});
</script>
</head>

<body data-type="generalComponents">
	<%@ include file="header.jsp"%>
	<div class="tpl-page-container tpl-page-header-fixed">
		<div class="tpl-left-nav tpl-left-nav-hover">
			<div class="tpl-left-nav-title">功能列表</div>
			<div class="tpl-left-nav-list">
				<ul class="tpl-left-nav-menu">
					<li class="tpl-left-nav-item"><a href="<%=path%>/test2/showBackIndex"
						class="nav-link"> <i class="am-icon-home"></i> <span>首页</span>
					</a></li>
					<li class="tpl-left-nav-item"><a
						href="<%=path%>/test2/getFileName"
						class="nav-link tpl-left-nav-link-list"> <i
							class="am-icon-file"></i> <span>文件和图片管理</span>
					</a></li>

					<li class="tpl-left-nav-item"><a href="javascript:;"
						class="nav-link tpl-left-nav-link-list"> <i
							class="am-icon-table"></i> <span>综合管理</span> <i
							class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
					</a>
						<ul class="tpl-left-nav-sub-menu">
							<li><a href="<%=path%>/test2/pagerXiangJu"> <i
									class="am-icon-angle-right"></i> <span>乡居管理</span> <i
									class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
							</a> <a href="<%=path%>/test2/pagerViewStory"> <i
									class="am-icon-angle-right"></i> <span>景点、故事管理</span></a>  <a
								href="<%=path%>/test2/pagerExperience"> <i
									class="am-icon-angle-right"></i> <span>体验管理</span>

							</a></li>
						</ul></li>

					<li class="tpl-left-nav-item"><a href="javascript:;"
						class="nav-link tpl-left-nav-link-list"> <i
							class="am-icon-wpforms"></i> <span>用户和评论管理</span> <i
							class="am-icon-angle-right tpl-left-nav-more-ico am-fr am-margin-right"></i>
					</a>
						<ul class="tpl-left-nav-sub-menu">
							<li><a href="<%=path%>/test2/pagerUser"> <i
									class="am-icon-angle-right"></i> <span>用户管理</span> <i
									class="am-icon-star tpl-left-nav-content-ico am-fr am-margin-right"></i>
							</a> <a href="<%=path%>/test2/PagerComment"> <i
									class="am-icon-angle-right"></i> <span>评论管理</span>
							</a></li>
						</ul></li>
<li class="tpl-left-nav-item"><a href="<%=path%>/test2/showAccessIpAddress" class="nav-link"> <i class="am-icon-bar-chart"></i> <span>网站访客统计</span>
					</a></li>
					<li class="tpl-left-nav-item"><a
						href="<%=path%>/test2/loginOut"
						class="nav-link tpl-left-nav-link-list"> <i
							class="am-icon-key"></i> <span>退出登录</span>

					</a></li>
				</ul>
			</div>
		</div>





		<div class="tpl-content-wrapper">
			<div class="tpl-content-page-title">综合管理</div>
			<ol class="am-breadcrumb">
				<li><a href="<%=path%>/test2/showBackIndex" class="am-icon-home">首页</a></li>
				<li><a href="#">综合管理</a></li>
				<li class="am-active">乡居管理</li>
			</ol>
			<div class="tpl-portlet-components">
				<div class="portlet-title">
					<div class="caption font-green bold">
						<span class="am-icon-home"></span> 乡居管理&nbsp;&nbsp;
						<span class="am-icon-eye am-icon-sm" style="float:right;color:black;font-size:14px;">表示在前台可见</span>
						<span class="am-icon-eye-slash am-icon-sm" style="float:right;color:black;font-size:14px;">表示在前台不可见&nbsp;&nbsp;</span>
					</div>


				</div>
				<div class="tpl-block">
					<div class="am-g" style="margin-bottom:30px;">
						<div class="am-u-sm-12 am-u-md-6">
							<div class="am-btn-toolbar">
								<div class="am-btn-group am-btn-group-xs">
									<button type="button"
										class="am-btn am-btn-default am-btn-success"
										onclick="javascript:window.location.href='<%=path%>/test2/addXiangJu.jsp'">
										<span class="am-icon-plus"></span> 新增
									</button>
								</div>
							</div>
						</div>
						<form action="<%=path%>/test2/pagerXiangJu" method="post"
							id="xiangju">
							<div class="am-u-sm-12 am-u-md-3" style="visibility:hidden;">
								<div class="am-form-group"></div>
							</div>
							<div class="am-u-sm-12 am-u-md-3">
								<div class="am-input-group am-input-group-sm">
									<input type="text" class="am-form-field" name="keyword"
										value="${keyword}"> <span class="am-input-group-btn">
										<input
										class="am-btn  am-btn-default am-btn-success tpl-am-btn-success am-icon-search"
										type="submit" value="查询">
									</span>
								</div>
							</div>
						</form>
					</div>
					<c:if test="${fn:length(result) eq 0 }">
						<span>查询的结果为空</span>
					</c:if>
					<c:if test="${keyword != '' && keyword != null }">
						<c:if test="${fn:length(result) ne 0 }">
							<span>在乡居中查询<span style="color:red">${keyword}</span>
								的结果：总共有${totalPages}条记录
							</span>
						</c:if>
					</c:if>
					<div class="am-g">
						<div class="tpl-table-images">
							<c:forEach items="${result}" var="xiangju">
								<div class="am-u-sm-12 am-u-md-6 am-u-lg-4">
									<div class="tpl-table-images-content">
										<div class="tpl-table-images-content-i-time">发布时间：${fn:substring(xiangju.addtime,0,10)}
										<c:if test="${xiangju.display == '1'}"><span class="am-icon-eye am-icon-sm" style="float:right;"></span></c:if>
										<c:if test="${xiangju.display == '0'}"><span class="am-icon-eye-slash am-icon-sm" style="float:right;"></span></c:if></div>
										<div class="tpl-i-title">${xiangju.roomTitle}</div>
										<a href="javascript:;" class="tpl-table-images-content-i">
											
											<span class="tpl-table-images-content-i-shadow"></span>
										   <c:if test="${fn:contains(xiangju.imageUrl,';')}">
										   <c:set value="${fn:split(xiangju.imageUrl,';')}" var="splitImageUrl"></c:set>
										   </c:if>	
										  <c:forEach items="${splitImageUrl}" begin="0" end="0" var="outImageUrl">
										   <img src="<%=path%>${outImageUrl}" alt="" style="width:100%;height:150px;">
										   </c:forEach>	
										     
										</a>
										<div class="tpl-table-images-content-block">
											<div class="tpl-i-font" style="height:30px;min-height:3em;">${xiangju.feature}</div>
											<div class="tpl-i-more">
												<ul>
													<li><span
														class="am-icon-rmb am-text-warning am-icon-sm">
															${xiangju.price}</span></li>
													<li><span class="am-icon-weixin am-text-success">
															</span></li>
													<li><span class="am-icon-github font-green">
															600+</span></li>
												</ul>
											</div>
											<div class="am-btn-toolbar">
												<div
													class="am-btn-group am-btn-group-xs tpl-edit-content-btn">
													<button type="button"
														class="am-btn am-btn-default am-btn-success"
														onclick="javascript:window.location.href='<%=path%>/test2/addXiangJu.jsp'">
														<span class="am-icon-plus"></span> 新增
													</button>
													<button type="button"
														class="am-btn am-btn-default am-btn-secondary"
														onclick="javascript:window.location.href='<%=path%>/test2/updateXiangJu?id=${xiangju.id}'">
														<span class="am-icon-edit"></span> 编辑
													</button>
													<button type="button"
														class="am-btn am-btn-default am-btn-warning" data-am-modal="{target: '#verify', closeViaDimmer: 0, width: 400, height: 130}" onclick="show('${xiangju.display}','${xiangju.id}')">
														<span class="am-icon-archive"></span> 审核
													</button>
													<button type="button"
														class="am-btn am-btn-default am-btn-danger"
														onclick="deleteXiangJu('${xiangju.id}','${xiangju.imageUrl}')">
														<span class="am-icon-trash-o"></span> 删除
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</c:forEach>
							<div class="am-u-lg-12">
								<div class="am-cf">
									<c:if test="${fn:length(result) ne 0 }">
										<div id="News-Pagination" style="float:right;"></div>
									</c:if>
								</div>
								<hr>
							</div>
						</div>
					</div>
				</div>
				<div class="tpl-alert"></div>
			</div>
		</div>
	</div>
	<div class="am-modal am-modal-no-btn" tabindex="-1" id="verify">
  <div class="am-modal-dialog">
    <div class="am-modal-hd"><p id="message" style="display:inline-block;height:14px;">是否显示在前台</p>
      <a href="javascript: void(0)" class="am-close am-close-spin" data-am-modal-close>&times;</a>
    </div>
    <div class="am-modal-bd">
     <label class="am-radio-inline" style="margin-left:30px;">
        <input type="radio" name="showViewStory" id="hiddenViewStory" value="0"> 隐藏
      </label>
     <label class="am-radio-inline">
        <input type="radio" name="showViewStory" id="showViewStory" value="1"> 显示
      </label>
     <input type="hidden" id="updateId"/>
      <br>
      <button class="am-btn am-btn-success" id="confirmUpdate" onclick="confirmUpdate()">确定更改</button>
    </div>
  </div>
</div>
	<script src="../js/amazeui.min.js"></script>
	<script src="../js/app.js"></script>
	<script src="../js/initAJAX.js"></script>
	<script type="text/javascript">
	 function deleteXiangJu(id,imageUrl){
	 swal({
				title : '确定删除吗？',
				text : '你将无法恢复它！',
				type : 'warning',
				showCancelButton : true,
				confirmButtonColor : '#3085d6',
				cancelButtonColor : '#d33',
				confirmButtonText : '确定删除！',
			}).then(function() {
				initAJAX();
				xmlHttp.open("POST", '<%=path%>/test2/deleteXiangJu?id=' + id + "&imageUrl=" + imageUrl, true);
				xmlHttp.send();
				xmlHttp.onreadystatechange = function() {
					if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	                   var res = xmlHttp.responseText;
	                   if(res == 'success') {
								swal(
									'删除',
									'成功',
									'success'
								);
							setTimeout(function() {
								window.location.reload();
							}, 3000);
							} else { 
	                            swal(
									'删除',
									'失败',
									'error'
								) ;
	                   }
	                   
					}
				}
			});
	 }
	function show(display,id){
	var showViewStory = document.getElementById("showViewStory");
	var hiddenViewStory = document.getElementById("hiddenViewStory");
	var updateId = document.getElementById("updateId");
	var message = document.getElementById("message");
	message.innerHTML = '是否显示在前台';
	message.style.color = 'black';
	updateId.value = id;
	if(display == '1'){
	showViewStory.checked = 'checked';
	} else if(display == '0'){
	hiddenViewStory.checked = 'checked';
	}
	}
	function confirmUpdate(){
	var showViewStory = document.getElementsByName("showViewStory");
	var updateId = document.getElementById("updateId");
	var message = document.getElementById("message");
	var showViewValue;
	for(var i = 0; i < showViewStory.length; i++){
	if(showViewStory[i].checked){
	showViewValue = i;
	}
	}
	//alert(showViewValue);
	initAJAX();
	xmlHttp.open("POST","<%=path%>/test2/showOrNotShow?display=" + showViewValue + "&updateId=" + updateId.value + "&updateType=xiangju",true);
	xmlHttp.send();
	xmlHttp.onreadystatechange = function(){
	if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
	var res = xmlHttp.responseText;
	if(res == 'success'){
	message.innerHTML = '修改成功';
	message.style.color = 'green';
	setTimeout(function() {
	window.location.reload();
	}, 3000);
	} else {
	message.innerHTML = '修改失败';
	message.style.color = 'red';
	}
	} else {
	message.innerHTML = '修改失败';
	message.style.color = 'red';
	}
	}
	}
	</script>
</body>
</html>