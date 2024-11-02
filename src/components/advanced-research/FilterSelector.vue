<script>
export default {
    name: 'lector',


    props: {
        filter: {
            type: Object,
            required: true
        }
    },


    data() {
        return {
            isMenuOpen: false,
            searchInFilter: '',
            selectedFilter: ''
        }
    },


    methods: {
        selectAndUpdateFilter(filter, selectedId, selectedName) {
            this.isMenuOpen = false;
            this.searchInFilter = '';

            if (filter.temporalSelection === selectedId) {
                this.selectedFilter = '';
                filter.temporalSelection = null;
            } else {
                this.selectedFilter = selectedName;
                filter.temporalSelection = selectedId;
            }

            this.$emit('update-filter', filter);
        },

        reset() {
            this.selectedFilter = '';
            this.filter.temporalSelection = null;
        },

        handleClickOnButton() {
            this.isMenuOpen = true;
            this.$nextTick(() => {
                this.$refs.searchInput.focus();
            });
        },

        handleClickOutside(event) {
            const targetElement = event.target;
            if (!this.$el.contains(targetElement)) {
                this.isMenuOpen = false;
                this.searchInFilter = '';
            }
        }
    },

    watch: {
        filter: {
            immediate: true,
            handler(updatedFilter) {
                const selectedCriteria = updatedFilter.criteria.find(criteria => {
                    return criteria.id === updatedFilter.temporalSelection
                });

                this.selectedFilter = selectedCriteria ? selectedCriteria.name : '';
            }
        }
    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },

    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>

<template>
    <div class="filter-selector">
        <button @focus="handleClickOnButton()" :class="{ set: selectedFilter }">
            {{ selectedFilter ? selectedFilter : 'Set a filter' }}
        </button>

        <div v-show="isMenuOpen" class="drop-down">
            <div class="search">
                <input type="text" class="" placeholder="Search" v-model="searchInFilter"
                       ref="searchInput">
            </div>

            <menu>
                <li v-for="criteria in filter.criteria" :key="criteria.id"
                    v-show="criteria.name.toUpperCase().includes(searchInFilter.toUpperCase())"
                    :class="{ 'selected': criteria.id == filter.temporalSelection }"
                    @click="selectAndUpdateFilter(filter, criteria.id, criteria.name);">
                    {{ criteria.name }}
                </li>
            </menu>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.filter-selector {
    $filterselector-fnt-size: $font-size-m;

    position: relative;
    width: 100%;

    &>* {
        border-radius: $btn-border-radius;
        border: 1px solid $clr-brand-primary;
        font-size: $filterselector-fnt-size;
        width: 100%;
    }

    button {
        position: relative;
        z-index: 11;
        padding: calc($filterselector-fnt-size / 4);
        outline: none;
        background-color: $clr-neutral-ltst;
        font-weight: 700;
        color: $clr-neutral-dk;
        box-shadow: inset 0 0 calc($filterselector-fnt-size / 2) rgba($clr-brand-primary, .25);
        cursor: pointer;

        &.set {
            color: $clr-brand-primary;
            box-shadow: inset 0 0 calc($filterselector-fnt-size / 2) $clr-brand-primary;
        }
    }

    .drop-down {
        position: absolute;
        z-index: 10;
        background-color: $clr-brand-primary;
        top: 0;
        padding-top: calc(($filterselector-fnt-size * 3) / 2);
        left: 0;
        overflow: hidden;

        .search {
            padding: calc($filterselector-fnt-size / 4);

            input {
                padding: calc($filterselector-fnt-size / 8) 0;
                outline: 0;
                border: 0;
                border-bottom: 1px solid $clr-neutral-ltst;
                font-size: $filterselector-fnt-size;
                background-color: transparent;
                color: $clr-neutral-ltst;
                width: 100%;

                &::placeholder {
                    color: $clr-neutral-lt;
                }
            }
        }

        menu {
            overflow-y: auto;
            width: 100%;
            max-height: calc((($filterselector-fnt-size * 3) / 2) * 9 + 9px);
            scrollbar-color: $clr-neutral-ltst $clr-brand-primary;
            scrollbar-width: thin;

            li {
                line-height: 1;
                padding: calc($filterselector-fnt-size / 4);
                cursor: pointer;
                overflow-x: hidden;
                text-wrap: nowrap;
                border-bottom: 0;
                border: 1px 0;
                background-color: $clr-neutral-ltst;
                color: $clr-neutral-dk;
                border-top: 1px solid $clr-brand-primary;

                &:hover {
                    color: $clr-brand-primary;
                }

                &.selected {
                    background-color: $clr-brand-primary;
                    color: $clr-neutral-ltst;
                }
            }
        }
    }
}
</style>