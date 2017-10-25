class Api::TasksController < ApplicationController
  before_action :require_logged_in, only: %i(index create update destroy)

  def index
    @tasks = current_user.tasks
  end

  def create
    @task = Task.new(task_params)
    @task.owner_id = current_user.id

    if @task.save
      render "api/tasks/show"
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def update
    @task = current_user.tasks.find(params[:idea])
    if @task.update(taks_params)
      render "api/tasks/show"
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  def destroy
    @task = current_user.tasks.find(params[:id])
    if @task.destroy
      render "api/tasks/show"
    else
      render json: @task.errors.full_messages, status: 422
    end
  end

  private

  def task_params
    params.require(:task).permit(:name, :assignee_id, :completed,
      :parent_id, :project_id)
  end
end
