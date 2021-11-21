<template>
	<view class="content">
		<text>index</text>
	</view>
</template>

<script>

export default {
    name: 'HomeIndex',
	setup () {
        uni.redirectTo({
            url: '/pages/Auth/Auth',
            fail (e) {
                console.log(e)
            }
        })
	}
}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
        margin: 200 rpx auto 50 rpx;
    }

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
