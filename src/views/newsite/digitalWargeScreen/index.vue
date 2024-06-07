<template>
	<div class="layout-padding">
		<div class="layout-padding-auto layout-padding-view">
			<el-row>
				<el-col :span="5">
					<div class="grid-content ">
						<el-row>
							<el-col :span="11">
								<div class="grid-content ">
									<div class="time">
										17:00
									</div>
								</div>
							</el-col>
							<el-col :span="12">
								<div class="grid-content ">
									<div class="week">
										星期一
									</div>
									<div class="date">
										2024年12月04日
									</div>
								</div>
							</el-col>
						</el-row>
					</div>
				</el-col>
				<el-col :span="14">
					<div class="grid-content ">
						<Decoration5 :dur="10" class="topTitle1"/>
						<div class="titleStyle">水 库 数 智 通 平 台</div>
						<Decoration5 :dur="10" class="topTitle"/>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6" class="elcol">
					<div class="grid-content ">
						<BorderBox10 class="box1" style="box-shadow: none;">
							<div class="title1">值班信息</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div class="info1">值班领导:</div>
							<div class="info2">值班人员:</div>
						</BorderBox10>
					</div>
					<div class="grid-content ">
						<BorderBox10 class="box2" style="box-shadow: none;">
							<div class="title2">水库概况</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div class="box2-info">
								<el-row>
									<el-col :span="4">
										<div class="grid-content">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												水库总数量
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												大（I）型
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												大（II）型
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												中型
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												小（I）型
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												小（II）型
											</div>
										</div>
									</el-col>
								</el-row>
								<el-row >
									<el-col :span="3"></el-col>
									<el-col :span="6">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												漫坝
											</div>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												超汛限
											</div>
										</div>
									</el-col>
									<el-col :span="6">
										<div class="grid-content ">
											<div class="box2-number">
												0
											</div>
											<div class="box2-world">
												超堰顶
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
						</BorderBox10>
					</div>
					<div class="grid-content ">
						<BorderBox10 class="box3" style="box-shadow: none;">
							<div class="title3">水库超汛限</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div>
								<el-row >
									<el-col :span="5">
										<div class="grid-content ">
											<div class="box3-world">
												排名
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box3-world">
												水库名称
											</div>
										</div>
									</el-col>
									<el-col :span="7">
										<div class="grid-content ">
											<div class="box3-world">
												当前水位（m）
											</div>
										</div>
									</el-col>
									<el-col :span="7">
										<div class="grid-content ">
											<div class="box3-world">
												超汛限水位（m）
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<hr style="width: 90%; color:#17c6e5; height: 1px; margin-left: 1vw;">
							<div class="box3-table" v-for="(item, index) in tableData.slice(0, 6)" :key="index">
								<el-row >
									<el-col :span="3">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{index+1}}
											</div>
										</div>
									</el-col>
									<el-col :span="7">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.name}}
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.now}}
											</div>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.now1}}
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
						</BorderBox10>
					</div>
					<div class="grid-content ">
						<BorderBox10 class="box4" style="box-shadow: none;">
							<div class="title4">库容概况</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div style="padding-top: 50px;">
								<el-row >
									<el-col :span="12">
										<div class="grid-content">
												<div class="box4-info">总库容:  - 亿m³</div>
												<div class="box4-info">当前库容:  - 亿m³</div>
												<div class="box4-info">正常库容:  - 亿m³</div>
										</div>
									</el-col>
									<el-col :span="12">
										<div class="grid-content ">
											<div style="margin-left: 50px;">
												<WaterLevelPond :config="config" style="width:80px;height:80px" />
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
						</BorderBox10>
					</div>
				</el-col>
				<el-col :span="11" class="elcol">
					<div class="grid-content ">
						<div ref="container"  id="container">
							<img ref="mapImage"  class="center-img" src="../../../assets/img/福建省.png" @load="initMap"/>
							<div 
								v-for="(point, index) in points" 
								:key="index" 
								class="map-point" 
								:style="{ 
													left: `calc(${origin.offsetX}px + ${point.x}px)`, 
													bottom: `calc(${origin.offsetY}px + ${point.y}px)` 
												}">
												<img src="../../../assets/img/水滴.png" alt="">
							</div>
						</div>
					</div>
				</el-col>
				<el-col :span="6" class="elcol">
					<div class="grid-content ">
						<BorderBox10 class="box5" style="box-shadow: none;">
							<div class="title5">天气预报</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div>
								<div class="box5-img">
									<img src="../../../assets/img/位置2.png" />
								</div>
								<div class="box5-addr">
									福州市
								</div>
								<div class="box5-img1">
									<div class="box5-info">星期一</div>
									<img src="../../../assets/img/天气.png" />
									<div class="box5-info">27℃-30℃</div>
								</div>
								<div class="box5-img2">
									<div class="box5-info">星期一</div>
									<img src="../../../assets/img/天气.png" />
									<div class="box5-info">27℃-30℃</div>
								</div>
								<div class="box5-img3">
									<div class="box5-info">星期一</div>
									<img src="../../../assets/img/天气.png" />
									<div class="box5-info">27℃-30℃</div>
								</div>
							</div>
						</BorderBox10>
					</div>
					<div class="grid-content ">
						<BorderBox10 class="box6" style="box-shadow: none;">
							<div class="title6">降雨量列表</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div>
								<el-row >
									<el-col :span="5">
										<div class="grid-content ">
											<div class="box3-world">
												序号
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box3-world">
												站点名称
											</div>
										</div>
									</el-col>
									<el-col :span="7">
										<div class="grid-content ">
											<div class="box3-world">
												当前雨量（mm）
											</div>
										</div>
									</el-col>
									<el-col :span="5">
										<div class="grid-content ">
											<div class="box3-world">
												站点位置
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
							<hr style="width: 90%; color:#17c6e5; height: 1px; margin-left: 1vw;">
							<div class="box3-table" v-for="(item, index) in tableData.slice(0, 8)" :key="index">
								<el-row >
									<el-col :span="3">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{index+1}}
											</div>
										</div>
									</el-col>
									<el-col :span="7">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.name}}
											</div>
										</div>
									</el-col>
									<el-col :span="4">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.now}}
											</div>
										</div>
									</el-col>
									<el-col :span="10">
										<div class="grid-content ">
											<div class="box3-table-info">
												{{item.now1}}
											</div>
										</div>
									</el-col>
								</el-row>
							</div>
						</BorderBox10>
					</div>
					<div class="grid-content ">
						<BorderBox10 class="box7" style="box-shadow: none;">
							<div class="title7">实时视频</div>
							<div class="titleImg">
								<img src="../../../assets/img/数字大屏小标题图片.png" />
							</div>
							<div class="box7-radio">
								<el-radio-group v-model="radio1" size="small">
									<el-radio-button label="视频1" value="New York" />
									<el-radio-button label="视频2" value="Washington" />
									<el-radio-button label="视频3" value="Los Angeles" />
									<el-radio-button label="视频4" value="Chicago" />
									<el-radio-button label="视频5" value="Chicago" />
								</el-radio-group>
							</div>
						</BorderBox10>
					</div>
				</el-col>
			</el-row>
		
		</div>
	</div>
</template>

<script setup lang="ts" name="systemDigitalWargeScreen">
import { Decoration5, BorderBox10,WaterLevelPond,CapsuleChart } from '@kjgl77/datav-vue3'
import { BasicTableProps, useTable } from '/@/hooks/table';
import { useMessage, useMessageBox } from '/@/hooks/message';
import { useDict } from '/@/hooks/dict';


const container = ref();
const mapImage = ref();
const points = ref(); // 存储点的坐标信息，格式如：[{x: 100, y: 200}, {...}]
const origin = ref({
	offsetX: 0,
	offsetY:0
});
// 初始化地图和打点
const initMap = () => {
  // 假设地图的视觉中心坐标（以像素为单位，相对于图片左上角）
  const centerPoint = { x: 0, y: 0 };

  // 计算图片的偏移量以使中心点居中
  const image = mapImage.value;
  const containerRect = container.value.getBoundingClientRect();
  const offsetX = (containerRect.width - image.width) / 2 - centerPoint.x;
  const offsetY = (containerRect.height - image.height) / 2 - centerPoint.y;

	origin.value.offsetX = offsetX;
	origin.value.offsetY = offsetY;
	console.log(origin.value);
	
  // 应用样式使图片居中并以指定点为中心
  mapImage.value.style.position = 'absolute';
  mapImage.value.style.left = `${offsetX}px`;
  mapImage.value.style.bottom = `${offsetY}px`;
	mapImage.value.style.transformOrigin = `calc(${centerPoint.x}px ${centerPoint.y}px)`;

	const examplePoints = [
		{ x: 320, y: 220 }, // 像素坐标
		{ x: 280, y: 180 },
		{ x: 150, y: 180 }, 
		{ x: 380, y: 300 }, 
		{ x: 220, y: 300 }, 
		{ x: 400, y: 400 },
		{ x: 250, y: 450 },
		{ x: 190, y: 90 },
    // 可以根据实际需求动态添加更多点
  ];
  // 将示例点赋值给响应式数据
  points.value = examplePoints;
	
};

onMounted(() => {
  // 确保图片加载完成后初始化
  if (mapImage.value.complete) {
    initMap();
  }
});

const config = reactive({
  data: [55],
  shape: 'round',
})

const radio1 = ref('New York')


const tableData = [
  {
    now1: '35',
    name: '八一水库',
    now: '28',
  },
  {
    now1: '30',
    name: '五四水库',
    now: '25',
  },
  {
    now1: '30',
    name: '六一水库',
    now: '21',
  },
  {
    now1: '32',
    name: '叠云水库',
    now: '23',
	},
	{
    now1: '29',
    name: '磐石水库',
    now: '20',
	},
	{
    now1: '25',
    name: '铁岭水库',
    now: '22',
	},
	{
    now1: '25',
    name: '铁岭水库',
    now: '22',
	},
	{
    now1: '25',
    name: '铁岭水库',
    now: '22',
	},
	

	
	
]

function getWeather() {
	
}

</script>


<style scoped>
::v-deep .dv-water-pond-level canvas{

	margin-left: 10px !important;
	transform: translate(-2px, 8px)

}
.layout-container .layout-padding-view{
	background-color: #010d57;
}
.topTitle1,.topTitle{
	height: 6vh;
	position: relative; /* 保证titleStyle可以相对于此定位 */
	top: 35%; /* 调整位置 */

}
.topTitle{
	width: 50vw;
	left: 50%;
	transform: translate(-50%, 0); /* 居中定位 */
}
.topTitle1{
	width: 40vw;
	left: 10%;
	transform: scaleY(-1);
	transform-origin: center;
}

.titleStyle{
	width: 50vw;
	text-align: center;
	color:white;
	font-size: 3vh;
	font-weight: 800;
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	top: 50%; /* 调整位置 */
	left: 50%;
	transform: translate(-50%, -50%); /* 居中定位 */
	text-shadow: 3.5px 3.5px 3px rgba(240, 237, 237, 0.5); /* 文字阴影增加深度（可选） */
	z-index: 1; /* 确保文字在图片之上 */
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
	
}
.time,.week,.date{
	color: white;
	font-weight: 600;
}
.time{
	margin-left: 12px;
	font-size: 5vh;
}
.week{
	font-size: 3vh;
}
.date{
	font-size: 2vh;
}
.box1{
	margin-top: -5vh;
	height: 12vh;
	background: #333a60;
}
.elcol{
	margin-left: 1vw;
}
.titleImg{
	padding-top: calc(3vh - 5px);
	width: 88%;
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	left: 50%;
	transform: translate(-50%, 0); /* 居中定位 */
}
.title1,.title2,.title3,.title4,.title5,.title6,.title7{
	color:white;
	font-size: 2vh;
	font-weight: 800;
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	left: 17%;
	transform: translate(-50%, -50%); /* 居中定位 */
	z-index: 1; /* 确保文字在图片之上 */
}
.title1{
	top: 22%; /* 调整位置 */
}
.title2{
	top: 17%; /* 调整位置 */
}
.title3{
	top: 11%;
	left: 19%;
}
.title4{
	top: 20%;
}
.title5{
	top:17%
}
.title6{
	top: 9%;
	left: 19%;
}
.title7{
	top: 14%;
	left: 17%;	
}
.info1,.info2{
	color:white;
	font-size: calc(2vh - 1px);
	font-weight: 600;
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	left: 17%;
	transform: translate(-50%, -50%); /* 居中定位 */
}
.info1{
	top: 54%; /* 调整位置 */
}
.info2{
	top: 79%; /* 调整位置 */
}
.box2{
	margin-top: 1vh;
	height: 17vh;
	background: #1f2335;
}
.box2-info{
	width: 96%;
	height: 62%; 
	background:#636572;
	border-radius: 24px;
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	top: 63%; /* 调整位置 */
	left: 50%;
	transform: translate(-50%, -50%); /* 居中定位 */
}
.box2-world,.box2-number{
	text-align: center;
}
.box2-world{
	font-size: calc(1vh + 2px);
	color: white;
	font-weight: 600;
	margin-bottom: -13px;
}
.box2-number{
	font-size: 2vh;
	color: #00ffff;
	font-style: italic;
	font-weight: 600;
}
.box3{
	background:#333a60;
	margin-top: 1vh;
	height: 27vh;
}
.box3-world{
	font-size: calc(1vh + 4px);
	color: #17c6e5;
	font-weight: 600;
	text-align: center;
	padding-top: 6vh;
}

.box3-table{
	border-radius: 20px;
	background-color: #717691;
	height: 21px;
	width: 90%;
	margin-left: 2vh;
	margin-top: 7px;
}
.box3-table-info{
	text-align: center;
	font-size: calc(1vh + 2px);
	color: white;
	line-height: 23px;
}
.box4{
	background:#333a60;
	margin-top: 1vh;
	height: 15vh;
}
.box4-info{
	margin-left: 3vw;
	color: white;
	font-weight: 600;
	padding-top: calc(1vh - 3px);
}
.box5{
	margin-top: -5vh;
	height: 17vh;
	background: #1f2335;
}
.box5-addr,.box5-img,.box5-img1,.box5-img2,.box5-img3{
	position: absolute; /* 或 relative, fixed 根据实际布局需求选择 */
	transform: translate(-50%, -50%); /* 居中定位 */
}
.box5-img{
	top: 61%; /* 调整位置 */
	width: 15%;
	left: 12%;
}
.box5-img1,.box5-img2,.box5-img3{
	width: 9%;
	top: 62%;
}
.box5-img1{
	left: 48%;
}
.box5-img2{
	left: 65%;
}
.box5-img3{
	left: 82%;
}
.box5-info{
	font-size: calc(1vh + 2px);
	color: white;
	margin-top: 8px;
	margin-bottom: 8px;
	text-align: center;
}
.box5-addr{
	top: 61%; /* 调整位置 */
	left: 28%;
	color: white;
	font-size: 1vw;
	font-weight: 600; 
}
.box6{
	background:#333a60;
	margin-top: 1vh;
	height: 33vh;
}
.box6-center{
	width: 100%;
	padding-top: 11%;
	padding-left: 3%;
}
.box6-center-number{
	color: white;
	padding-top: calc(1% + 2px);
	padding-left: 15%;
	margin-bottom: -1%;
	font-size: calc(1vw - 6px);
}
.box6-center-word{
	width: 12%;
	text-align: right;
	font-size: calc(1vw - 4px);
	font-weight: 800; 
}
.box6-progress{
	width: 80%;
	padding-top: calc(2% - 2px);
	padding-left: 3%;
}
.box7{
	background:#333a60;
	margin-top: 1vh;
	height: 22vh;
}
::v-deep .el-radio-button__inner {
	background:none !important ; /* 修改默认背景颜色 */
	color: #00e3f5 !important; /* 修改默认文字颜色 */
	border-color: #00e3f5 !important;
	padding: 5px 20px;
}
/* 修改选中的颜色和文字颜色 */
::v-deep .el-radio-button__original-radio:checked + .el-radio-button__inner {
	background-color: #00e3f5 !important ; /* 修改默认背景颜色 */
	color: white !important; /* 选中文字颜色 */
}
.box7-radio{
	padding:12% 0 0 6%
}
#container{
        padding:0px;
        margin: 0px;
        width: 100%;
        height: 600px;
				background:#131a43;
				position: relative;
}
.center-img{
	display: block;
	height: 90%;
	
}
.map-point {
  position: absolute;
  width: 40px;
  height: 40px;
  
}
</style>
