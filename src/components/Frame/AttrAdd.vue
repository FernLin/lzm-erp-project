<template>
    <div class="attr-container">
        <i class="el-icon-error out-close-icon" @click="deleteAttr" />
        <div class="main-content">
            <div class="operate">
                <span>{{ attrName }}</span>
                <div class="operate-right">
                    <el-input v-model="attrValue" placeholder="请输入规格值" style="width: 200px; margin-right: 8px" />
                    <el-button :class="attrValue ? 'primary' : 'is-disabled'" :disabled="!attrValue" @click="addAttrVal" icon="el-icon-plus">添加规格值</el-button>
                </div>
            </div>
            <div class="show-content">
                <span>规格值:</span>
                <div>
                    <div v-for="(item, index) in valList" :key="index" class="val-content">
                        <div>{{ item[attrName] }}</div>
                        <i class="el-icon-error close-icon" @click="deleteAttrVal(item)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AttrAdd',
    props: {
        attrName: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            attrValue: '',
            valList: [],
        };
    },
    watch: {
        valList: {
            deep: true,
            handler(val) {
                this.$emit('getValList', this.attrName, val);
            },
        },
    },
    methods: {
        deleteAttr() {
            this.$emit('deleteAttr', this.attrName);
        },
        addAttrVal() {
            const res = _.find(this.valList, (el) => {
                return el[this.attrName] === this.attrValue;
            });
            if (_.isEmpty(res)) {
                this.valList.push({ [this.attrName]: this.attrValue });
            } else {
                this.$message.error('当前规格值已存在，请重新添加！');
            }
            this.attrValue = '';
        },
        deleteAttrVal(val) {
            this.valList = this.valList.filter((el) => {
                return el[this.attrName] !== val[this.attrName];
            });
        },
    },
};
</script>

<style scoped lang="scss">
.attr-container {
    position: relative;
    margin-top: 15px;
    .out-close-icon {
        position: absolute;
        top: -8px;
        right: -8px;
    }
    .el-icon-error {
        color: $delete-color;
        font-size: 18px;
        cursor: pointer;
    }
    .main-content {
        border: 1px solid $border-color;
        padding: 10px 12px;
        min-height: 96px;
        .operate {
            display: flex;
            align-items: center;
            justify-content: space-between;
            &-right {
                display: flex;
                align-items: center;
            }
        }
        .show-content {
            display: flex;
            align-items: flex-start;
            margin-top: 15px;
            & span {
                display: inline-block;
                width: 60px;
                line-height: 26px;
            }
            & > div {
                display: flex;
                flex-wrap: wrap;
                max-width: calc(100% - 60px);
            }
            .val-content {
                border: 1px solid $border-color;
                padding: 0 4px;
                width: 50px;
                position: relative;
                text-align: center;
                height: 24px;
                line-height: 20px;
                margin: 0 0 15px 15px;
                .close-icon {
                    position: absolute;
                    bottom: 15px;
                    right: -8px;
                }
            }
        }
    }
}
</style>
