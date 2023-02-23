import Breadcrumb from "@/components/Breadcrumb"
import RecentActivity from "@/components/RecentActivity"
import { useRecentActivities } from "@/store/useRecentActivities"
import { Box, CircularProgress, Heading, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import shallow from "zustand/shallow"
import Paginator from "./jurisdiction/Paginator"

const LoadingIcon = () => <CircularProgress isIndeterminate size="1.3em" color='brand.java' />

const RecentActivityPage: NextPage = () => {
  const router = useRouter();

  // Get the selected page from the URL
  const urlPage = useMemo(() => {
    try {
      if (router.query.page) {
        const p = parseInt(router.query.page as string)
        return p > 0 ? p : 1;
      }
    } catch (e) {}
    return 1
  }, [router.query.page])

  const { loadRecentActivities, isInitialized } = useRecentActivities(state => ({ loadRecentActivities: state.loadPage, isInitialized: state.isInitialized }), shallow )
  const recentActivitiesLoading = useRecentActivities(state => state.loadingPages[0])
  const recentActivities = useRecentActivities(state => state.pages[urlPage-1])
  const totalCount = useRecentActivities(state => state.totalCount)
  const loadingPage = useRecentActivities(state => state.loadingPages[urlPage-1])
  
  useEffect(() => {
    if (recentActivities === undefined && !recentActivitiesLoading && isInitialized())
      loadRecentActivities(urlPage-1)
  }, [recentActivities, recentActivitiesLoading, loadRecentActivities, urlPage, isInitialized()])

  // Store the selected page in the URL to keep it in the history
  const setURLPage = (page: number) => {
    router.push(`/recent-activity?page=${page}`);
  } 
  
  const paginator = useMemo(() => (
    <Paginator
      pageSize = {12}
      totalItems = {totalCount||0}
      currentPage = {urlPage}
      onPageChange={n => setURLPage(n)} 
    />
  ), [totalCount, urlPage])

  return (
    <Box width="100%">
      <Head><title>Recent Activity</title></Head>
      <Breadcrumb items={[
        {label:"Recent Activity", href:""},
      ]}/>
      <Heading whiteSpace="pre-line" my={4} marginBottom="48px" variant="80">
        Recent Activity
      </Heading>
      <Box width="70%">
        {totalCount > 12 && paginator}

        {(totalCount === -1 || loadingPage !== undefined) && <LoadingIcon /> }
        <RecentActivity activities={recentActivities} />
        {totalCount === 0 && <Text>No properties found</Text>}

        {totalCount > 12 && paginator}
      </Box>
    </Box>
  )
}

export default RecentActivityPage