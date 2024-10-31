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
            searchInFilter: ''
        }
    },


    methods: {
        selectAndUpdateFilter(filter, selectedId, selectedName) {
            this.isMenuOpen = false;

            if (filter.temporalSelection === selectedId) {
                this.searchInFilter = '';
                filter.temporalSelection = null;
            } else {
                this.searchInFilter = selectedName;
                filter.temporalSelection = selectedId;
            }

            this.$emit('update-filter', filter);
        },


        reset() {
            this.searchInFilter = '';
            this.filter.temporalSelection = null;
        }
    },

    watch: {
        filter: {
            immediate: true,
            handler(updatedFilter) {
                const selectedCriteria = updatedFilter.criteria.find(criteria => {
                    return criteria.id === updatedFilter.temporalSelection
                });

                this.searchInFilter = selectedCriteria ? selectedCriteria.name : '';
            }
        }
    }
}
</script>

<template>

    <div class="filter-selector">
        <input type="text" class="" @focus="isMenuOpen = true" placeholder="Set a filter"
               v-model="searchInFilter">

        <div v-show="isMenuOpen" class="drop-down">
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

    input {
        position: relative;
        z-index: 11;
        padding: calc($filterselector-fnt-size / 4);
        box-shadow: inset 0 0 calc($filterselector-fnt-size / 2) rgba($clr-brand-primary, .5);
        outline: none;
        background-color: $clr-neutral-ltst;
        color: $clr-neutral-dkst;
        font-weight: 700;

        &:focus {
            box-shadow: inset 0 0 calc($filterselector-fnt-size / 2) rgba($clr-brand-primary, 1);
        }
    }

    .drop-down {
        position: absolute;
        z-index: 10;
        background-color: $clr-brand-primary;
        top: 0;
        padding-top: calc(($filterselector-fnt-size * 3) / 2 + 3px);
        left: 0;
        scrollbar-color: $clr-brand-primary $clr-neutral-ltst;
        scrollbar-width: calc($filterselector-fnt-size / 2);
        overflow: hidden;

        menu {
            overflow-y: auto;
            width: 100%;
            max-height: calc((($filterselector-fnt-size * 3) / 2) * 8);

            li {
                line-height: 1;
                padding: calc($filterselector-fnt-size / 4);
                cursor: pointer;
                overflow-x: hidden;
                text-wrap: nowrap;

                &:nth-child(even) {
                    background-color: $clr-neutral-ltst;
                    color: $clr-neutral-dk;
                }

                &:nth-child(odd) {
                    background-color: $clr-neutral-lt;
                    color: $clr-neutral-ltst;
                }

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